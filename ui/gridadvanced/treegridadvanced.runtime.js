﻿gaRequire.require.config({
    baseUrl: '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/include'
});

TW.Runtime.Widgets.treegridadvanced = function () {

    var thisWidget = this;
    var gridAdvanced;
    var tableData = [];
    var defaultStyles = {};
    var gridId;
    var gridHeaderColAlign = [];
    var containerWidth = 0;
    var currentUser;
    var updatedProperties = {};
    var propertyUpdateOrder = [];
    var checkBound;
    var configLoaded = false;
    var tableSized = false;
    var infoTableDataShape;

    this.runtimeProperties = function () {
        return {
            'needsDataLoadingAndError': true,
            'supportsAutoResize': true
        };
    };
    
    this.handleResponsiveWidgets = function () {
        // If the container for the table has been made visible we need to resize the columns
        if(gridAdvanced && this.properties.ResponsiveLayout) {
            var widgetObj = this;

            clearTimeout(this.resizeHandle);
            this.resizeHandle = setTimeout(function() {
                gridAdvanced.resize();

                // Now that the columns have been resized we can reset the height and show the grid
                widgetObj.jqElement.height("auto");
                tableSized = true;
            }, 50);
        }
    };

    this.renderHtml = function () {
        gridId = thisWidget.getProperty('Id');
        var responsiveStyle = "";
        TW.Session.UpdateCurrentUser(function() {
            currentUser = TW.Session.CurrentUser;
        });
        if(this.properties.ResponsiveLayout)
        {
        	responsiveStyle = ' style="width: 100%; height: 100%" ';
        }
        var html = '<div class="widget-content widget-gridadvanced">' +
            '<div id="' + gridId + '-top-container" class="grid-control-container"></div>' +
            '<div id="' + gridId + '-bottom-container" class="grid-control-container"></div>' +
            '<div id="' + gridId + '" ' + responsiveStyle + '></div></div>';
        return html;
    };

    this.updateProperty = function (updatePropertyInfo) {
        switch (updatePropertyInfo.TargetProperty) {
            case 'Configuration' :
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.SinglePropertyValue;
                break;
            case 'Data' :
                infoTableDataShape = updatePropertyInfo.DataShape;
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows;
                break;
            case 'SelectedRows':
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows
                    .map(function(row) {
                        return row[thisWidget.getProperty('IDFieldName')];
                    });
                break;
            case 'SelectRow':
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.SinglePropertyValue;
                break;
            case 'ExpandRows':
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows
                    .map(function(row) {
                        return row[thisWidget.getProperty('IDFieldName')];
                    }).join(',');
                break;
            case 'DefaultSelectedRows' :
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.SinglePropertyValue;
                break;
            case 'QueryFilter' :
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows[0].Query;
                break;
        }
        propertyUpdateOrder.push(updatePropertyInfo.TargetProperty);
        var bound = this.isConfigurationBound();
        if (this.checkBindables(bound)) {
            this.updateBindables(bound);
        }
    };

    this.isConfigurationBound = function() {
        var configurationBound = false;
        if (thisWidget.mashup.DataBindings && thisWidget.mashup.DataBindings.length > 0) {
            var bindings = thisWidget.mashup.DataBindings;
            bindings.forEach(function(binding) {
                if (binding.PropertyMaps && binding.PropertyMaps.length > 0) {
                    if (binding.PropertyMaps[0].TargetProperty === 'Configuration'
                        && binding.TargetId === thisWidget.idOfThisElement) {
                        configurationBound = true;
                    }
                }
            });
        }
        return configurationBound;
    };

    this.checkBindables = function(configurationBound) {
        if ((gridAdvanced && configurationBound === true && updatedProperties['Configuration'])
            || (gridAdvanced && updatedProperties['Data'])
            || (gridAdvanced && updatedProperties['SelectedRows'])
            || (gridAdvanced && updatedProperties['ExpandRows'])
            || (gridAdvanced && updatedProperties['DefaultSelectedRows']
            || (gridAdvanced && updatedProperties['QueryFilter']))) {
            return true;
        } else {
            return false;
        }
    };

    this.updateBindables = function(configurationBound) {
        if (checkBound) {
            clearTimeout(checkBound);
        }
        propertyUpdateOrder.forEach(function (property) {
            var propertyData = updatedProperties[property];
            if (property === 'Configuration') {
                var parser = thisWidget.ConfigurationParserFactory.createParser('dynamic', JSON.parse(propertyData),
                    undefined, undefined, true);
                gridAdvanced.updateBindable('Configuration', parser.configuration);
                configLoaded = true;
            }
            else if (property === 'Data') {
                gridAdvanced.updateBindable('Data', propertyData);
            }
            else if (property === 'SelectedRows') {
                gridAdvanced.updateBindable('SelectedRows', propertyData);
            }
            else if (property === 'ExpandRows') {
                gridAdvanced.updateBindable('ExpandRows', propertyData);
            }
            else if (property === 'DefaultSelectedRows') {
                gridAdvanced.updateBindable('DefaultSelectedRows', propertyData);
            }
            else if (property === 'QueryFilter') {
                    gridAdvanced.updateBindable('QueryFilter', propertyData);
            }
        });
        this.positionContainers();
        gridAdvanced.onRowDblClicked = thisWidget.onRowDblClicked;
        updatedProperties = {};
        propertyUpdateOrder = [];
    };

    this.afterRender = function () {
        gaRequire.define("jquery", function () {
            //drop the `true` if you want jQuery (but not $) to remain global
            return $;
        });
        gaRequire.require(["grid-advanced-widget", "dhtmlx-bundle"], function() {
            gaRequire.require(["dhtmlx-tree-bundle"], function(){
                gaRequire.requirejs(['jquery',
                        'tw-grid-advanced/tw-grid-advanced',
                        'tw-grid-advanced/configuration-parser-factory',
                        'tw-grid-advanced/tooltip/tooltip-factory',
                        'dhxtreegrid'
                    ],
                    function() {
                        thisWidget.TwGridAdvanced = arguments[1].TwGridAdvanced;
                        thisWidget.ConfigurationParserFactory = arguments[2].ConfigurationParserFactory;
                        gridAdvanced = new thisWidget.TwGridAdvanced(gridId, thisWidget.rowSelectionCallback, true);
                        gridAdvanced.childDataServiceInvoker = thisWidget.createServiceInvoker(
                            thisWidget.getProperty('ChildDataServiceBindingDef')
                        );
                        gridAdvanced.queryDataServiceInvoker = thisWidget.createServiceInvoker(
                            thisWidget.getProperty('DataServiceBindingDef')
                        );

                        gridAdvanced.imagePath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/imgs/';
                        gridAdvanced.menuIconsPath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/common/images/';
                        gridAdvanced.structPath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/common/';
                        gridAdvanced.tooltip = arguments[3].TooltipFactory.getTooltip('mashup-builder');
                        containerWidth = thisWidget.jqElement.width();
                        if (containerWidth === 0 && !tableSized) {
                            thisWidget.jqElement.height(0);
                        }
                        if (thisWidget.properties.ResponsiveLayout) {
                            gridAdvanced.enableResponsiveLayout();
                        }

                        gridAdvanced.enableUserConfiguration(currentUser, thisWidget.getProperty('ConfigurationId'),
                                                             thisWidget.getProperty('CookiePersistence'));

                        gridAdvanced.statusTextMessageCallback = TW.Runtime.showStatusText;
                        thisWidget.attachEvents();
	                    if(!thisWidget.isConfigurationBound()) {
		                    var parser = thisWidget.ConfigurationParserFactory.createParser('mashup-builder', thisWidget,
                                                                                            TW.getStyleFromStyleDefinition,
                                                                                            TW.Runtime.convertLocalizableString, true);
		                    gridAdvanced.updateBindable('Configuration', parser.configuration);
	                    }
                        gridAdvanced.localizationUtil = function(token) {
                            var val = TW.Runtime.convertLocalizableString(Encoder.htmlEncode(token)).replace(/,/g,'&#44;');
                            return val;
                        };
                        gridAdvanced.l8nTokens = {
                            search: TW.Runtime.convertLocalizableString("[[search]]", "Search"),
                            reset: TW.Runtime.convertLocalizableString("[[reset]]", "Reset"),
                            results: TW.Runtime.convertLocalizableString("[[results]]", "Results"),
                            records: TW.Runtime.convertLocalizableString("[[records]]", "Rows"),
                            to: ' - ',
                            page: TW.Runtime.convertLocalizableString("[[page]]", "Page"),
                            perpage: TW.Runtime.convertLocalizableString("[[perpage]]", "rows per page"),
                            first: TW.Runtime.convertLocalizableString("[[toFirstPage]]", "To first Page"),
                            previous: TW.Runtime.convertLocalizableString("[[prevPage]]", "Previous Page"),
                            found: TW.Runtime.convertLocalizableString("[[foundRecords]]", "Found records"),
                            next: TW.Runtime.convertLocalizableString("[[nextPage]]", "Next Page"),
                            last: TW.Runtime.convertLocalizableString("[[toLastPage]]", "To last Page"),
                            of: TW.Runtime.convertLocalizableString("[[spacedOf]]", " of "),
                            notfound: TW.Runtime.convertLocalizableString("[[notFound]]", "No Records Found"),
                            maxRowsWarning1: TW.Runtime.convertLocalizableString("[[maxRowsWarning1]]", "The maximum grid cache size of "),
                            maxRowsWarning2: TW.Runtime.convertLocalizableString("[[maxRowsWarning2]]", " rows has been reached. "),
                            maxRowsWarning3: TW.Runtime.convertLocalizableString("[[maxRowsWarning3]]", "Please refresh your browser or close some nodes to free up memory. "),
                            freeMemoryWarning: TW.Runtime.convertLocalizableString("[[freeMemoryWarning]]", "Please wait while we clear the row cache to free up memory, this may take a minute..."),
                            splitGrid: TW.Runtime.convertLocalizableString("[[splitGrid]]", "Split"),
                            unSplitGrid: TW.Runtime.convertLocalizableString("[[unSplitGrid]]", "Unsplit")
                        }

                        var bound = thisWidget.isConfigurationBound();
                        if (thisWidget.checkBindables(bound)) {
                            thisWidget.updateBindables(bound);
                        }

                    });
            });
        });
    };

    this.attachEvents = function() {
        $('#' + gridId).on('queryGridColumns', function(event, query) {
            thisWidget.setProperty('QueryFilter', query);
            thisWidget.jqElement.triggerHandler('Filter');
        });
    };

    this.onRowDblClicked = function(){
        thisWidget.jqElement.triggerHandler('DoubleClicked');
    };

    this.rowSelectionCallback = function(rowIds, rows){
        var clonedTable = TW.InfoTableUtilities.CloneInfoTable({ "dataShape" : { "fieldDefinitions" : infoTableDataShape}, "rows" : rows });

        thisWidget.setProperty('SelectedRows', clonedTable);
        thisWidget.jqElement.triggerHandler('SelectedRowsChanged');
    };

    /**
     * Place the pagination container either above or below the grid depending on the 'pageLocation' setting.
     * @param pageLocation
     */
    this.positionContainers = function(){
        var topId = '#' + gridId + '-top-container';
        var $top = $(topId).detach();

        var bottomId = '#' + gridId + '-bottom-container';
        var $bottom = $(bottomId).detach();
        
        $top.insertBefore('#'+gridId);
        $bottom.insertAfter('#'+gridId);
    };

    this.beforeDestroy = function () {
        // gridAdvanced.destroy();
        gridAdvanced = undefined;
        thisWidget.PaginationSettings = undefined;
        thisWidget = undefined;
    };

    /**
     * Hits a service and calls the callback when done.
     * @param {*} bindingDef object containing the binding definitions for entityType, entityName and target, e.g. service name
     */
    this.createServiceInvoker = function(bindingDef) {
        if (bindingDef) {
            var parameters = {};
            // find the parameters for this service
            var entity = bindingDef.entityType + '_' + bindingDef.entityName;
            if (TW.Runtime.Workspace.Mashups.Current.Data && TW.Runtime.Workspace.Mashups.Current.Data[entity]) {
                var services = TW.Runtime.Workspace.Mashups.Current.Data[entity].Services;
                if (services) {
                    services.forEach(function (service) {
                        if (service.Target === bindingDef.target) {
                            parameters = service.Parameters;
                        }
                    });
                }
            }
            var invokeInfo =
            {
                entityType:     bindingDef.entityType,
                entityName:     bindingDef.entityName,
                characteristic: 'Services',
                target:         bindingDef.target,
                apiMethod:      RESTAPIConstants.Methods.METHOD_POST,
                parameters:     parameters
            };
            return new ThingworxInvoker(invokeInfo);
        }
    };
};