gaRequire.require.config({
    baseUrl: '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/include',
    waitSeconds: 30
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
    var idFieldName = 'id';

    this.runtimeProperties = function () {
        return {
            'needsDataLoadingAndError': true,
            'supportsAutoResize': true
        };
    };

    this.resize = function () {
        // If the container for the table has been made visible we need to resize the columns
        if(this.properties.ResponsiveLayout) {
            var widgetObj = this;

            clearTimeout(this.resizeHandle);
            this.resizeHandle = setTimeout(function() {
                if (gridAdvanced) {
                    gridAdvanced.resize();
                }
                // Now that the columns have been resized we can reset the height and show the grid
                widgetObj.jqElement.height("auto");
                tableSized = true;
            }, 500);
        }
    };

    this.renderHtml = function () {
        gridId = thisWidget.jqElementId + '-grid-advanced';
        idFieldName = thisWidget.getProperty('IDFieldName');
        var responsiveStyle = "";
        TW.Session.UpdateCurrentUser(function() {
            currentUser = TW.Session.CurrentUser;
        });
        if(this.properties.ResponsiveLayout)
        {
        	responsiveStyle = ' style="width: 100%; height: 100%" ';
        }
        var html = '<div class="widget-content widget-gridadvanced">';
        if (thisWidget.getProperty('ShowDataLoading')) {
            var icon = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/imgs/loader-100.gif';
            var spinnerId = gridId + '-spinner';
            html += '<div id="' + spinnerId + '" class="spinner"><img src="' + icon + '"/></div>';
        }
        html += '<div id="' + gridId + '-top-container" class="grid-control-container"></div>' +
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
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows;
                infoTableDataShape = updatePropertyInfo.DataShape;
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
            case 'IsEditable' :
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.RawSinglePropertyValue;
                break;
            case 'FooterData' :
                updatedProperties[updatePropertyInfo.TargetProperty] = updatePropertyInfo.ActualDataRows;
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
            || (gridAdvanced && updatedProperties['DefaultSelectedRows'])
            || (gridAdvanced && updatedProperties['IsEditable'] !== undefined)
            || (gridAdvanced && updatedProperties['FooterData'])
            || (gridAdvanced && updatedProperties.hasOwnProperty('QueryFilter'))) {
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
            else if (property === 'IsEditable') {
                gridAdvanced.updateBindable('IsEditable', propertyData);
            }
            else if (property === 'FooterData') {
                gridAdvanced.updateBindable('FooterData', propertyData);
            }
        });
        this.positionContainers();
        gridAdvanced.onRowDblClicked = thisWidget.onRowDblClicked;
        updatedProperties = {};
        propertyUpdateOrder = [];
    };
    var self = this;
    this.afterRender = function () {
        gaRequire.define("jquery", function () {
            //drop the `true` if you want jQuery (but not $) to remain global
            return $;
        });
        gaRequire.require(["grid-advanced-widget", "dhtmlx-bundle"], function() {
            gaRequire.require(["dhtmlx-tree-bundle"], function(){
                gaRequire.requirejs(['jquery',
                        'tw-grid-advanced/grid-advanced/tw-grid-advanced',
                        'tw-grid-advanced/grid-advanced/configuration-parser-factory',
                        'tw-grid-advanced/grid-advanced/tooltip/tooltip-factory',
                        'dhxtreegrid'
                    ],
                    function() {
                        thisWidget.TwGridAdvanced = arguments[1].TwGridAdvanced;
                        thisWidget.ConfigurationParserFactory = arguments[2].ConfigurationParserFactory;
                        gridAdvanced = new thisWidget.TwGridAdvanced(gridId, thisWidget.rowSelectionCallback, true);
                        gridAdvanced.childDataServiceInvoker = thisWidget.createServiceInvoker(
                            thisWidget.getProperty('ChildDataServiceBindingDef')
                        );
                        gridAdvanced._widget = self;
                        gridAdvanced.childDataServiceParameters = thisWidget.childDataServiceParameters;
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
                        gridAdvanced.cellEditCallback = thisWidget.handleCellEditsCallback;
                        gridAdvanced.gridEditCallback = thisWidget.handleGridEditsCallback;
                        gridAdvanced.enableFilterEventOnConfigChange = thisWidget.getProperty('EnableFilterEventOnConfigChange');
                        thisWidget.attachEvents();
	                    if(!thisWidget.isConfigurationBound()) {
		                    var parser = thisWidget.ConfigurationParserFactory.createParser('mashup-builder', thisWidget,
                                                                                            TW.getStyleFromStyleDefinition,
                                                                                            TW.Runtime.convertLocalizableString, true);
		                    gridAdvanced.updateBindable('Configuration', parser.configuration);
                            idFieldName = parser.configuration.idFieldName;
	                    }
                        gridAdvanced.localizationUtil = function(token) {
                            var val = TW.Runtime.convertLocalizableString(Encoder.htmlEncode(token)).replace(/,/g,'&#44;');
                            return val;
                        };
                        gridAdvanced.l8nTokens = {
                            search: TW.Runtime.convertLocalizableString("[[search]]", "Search"),
                            reset: TW.Runtime.convertLocalizableString("[[reset]]", "Reset"),
                            edit: TW.Runtime.convertLocalizableString("[[edit]]", "Edit"),
                            save: TW.Runtime.convertLocalizableString("[[save]]", "Save"),
                            cancel: TW.Runtime.convertLocalizableString("[[cancel]]", "Cancel"),
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
                        };

                        var bound = thisWidget.isConfigurationBound();
                        if (thisWidget.checkBindables(bound)) {
                            thisWidget.updateBindables(bound);
                        }

                    });
            });
        });
    };

    /**
     * Copied from thingworx.datamanager.controller.js
     * This code updates the parameters for the service by looping through
     * each binding and getting the current value.
     * @param {string} entityName Example: 'Things_GridAdvancedExampleServices'
     * @param {string} target Example: 'GetPartsData'
     */
    this.updateServiceParameters = function(entityName, target) {
        var parmVal, parmName, fieldName;
        var didSetEntityName = false;
        var entityNameSetTo = undefined;
        var def = thisWidget.mashup.Data[entityName].ServiceInvocations[target]
        var thisData = thisWidget.mashup.Data[entityName];
        var thisDataMgr = thisWidget.mashup.dataMgr;
        $.each(thisWidget.mashup.DataBindings, function () {
            var dataBinding = this;
            parmVal = undefined;
            try {
                // handle EntityName for DynamicThing{Shapes,Templates}
                if (this.TargetArea === "Data" && this.TargetSection === thisData.DataName && this.TargetId === "EntityName" && this.PropertyMaps[0].TargetPropertyType === "Entity") {
                    // entity name being set
                    didSetEntityName = true;

                    var updatePropertyInfo = thisDataMgr.getUpdatePropertyInfoFromBindingSource(dataBinding);
                    entityNameSetTo = updatePropertyInfo.SinglePropertyValue;
                } else if (this.TargetArea === "Data" && this.TargetSection === thisData.DataName && this.TargetId === def.Name) {
                    // another parameter being set
                    var updatePropertyInfo = thisDataMgr.getUpdatePropertyInfoFromBindingSource(dataBinding);
                    if (dataBinding.PropertyMaps[0].SourceProperty === '' && (dataBinding.PropertyMaps[0].SourcePropertyBaseType === 'INFOTABLE' || dataBinding.PropertyMaps[0].SourcePropertyBaseType === '') && dataBinding.PropertyMaps[0].TargetPropertyBaseType === 'INFOTABLE') {
                        //parmVal = updatePropertyInfo.RawDataFromInvoke;
                        parmVal = updatePropertyInfo.RawSinglePropertyValue;
                    } else if( dataBinding.PropertyMaps[0].TargetProperty.indexOf('.') > 0 ) {
                        // nested infotable parameter ... create a row if it doesn't exist
                        var tgtProp =  dataBinding.PropertyMaps[0].TargetProperty;
                        var nDot = tgtProp.indexOf('.');
                        parmName = tgtProp.substring(0,nDot);
                        fieldName = tgtProp.substring(nDot+1);
                        if( def.Parameters[parmName] === undefined ) {
                            def.Parameters[parmName] = {
                                'dataShape': {
                                    fieldDefinitions: {},
                                    name: 'handBuilt',
                                    description: ''
                                },
                                'name': '',
                                'description': '',
                                'rows': [{}]
                            };
                        }

                        // add it to the dataShape
                        def.Parameters[parmName].dataShape.fieldDefinitions[fieldName] = {
                            name: fieldName,
                            baseType: dataBinding.PropertyMaps[0].TargetPropertyBaseType
                        };

                        // set the value
                        def.Parameters[parmName].rows[0][fieldName] = updatePropertyInfo.RawSinglePropertyValue;
                    } else {
                        // normal parameter
                        if( dataBinding.PropertyMaps[0].SourcePropertyBaseType === 'JSON'  ) {
                            // for JSON parms, just put them in directly
                            def.Parameters[dataBinding.PropertyMaps[0].TargetProperty] = updatePropertyInfo.RawDataFromInvoke;
                            // def.Parameters[dataBinding.PropertyMaps[0].TargetProperty] = updatePropertyInfo.RawSinglePropertyValue;
                        } else {
                            if (updatePropertyInfo.ActualDataRows !== undefined && updatePropertyInfo.ActualDataRows.length > 0) {
                                //parmVal = updatePropertyInfo.ActualDataRows[0][dataBinding.PropertyMaps[0].SourceProperty];
                                parmVal = updatePropertyInfo.RawSinglePropertyValue;
                            }
                            if (parmVal === undefined) {
                                // pjh 1/16/2012 - it's ok to set the parameter to undefined - sometimes that's what's correct
                                def.Parameters[this.PropertyMaps[0].TargetProperty] = undefined;
                            } else {
                                parmVal = TW.Runtime.baseTypeConversion(parmVal, dataBinding.PropertyMaps[0]);
                                def.Parameters[dataBinding.PropertyMaps[0].TargetProperty] = parmVal;
                            }
                        }
                    }
                    if (parmVal !== undefined) {
                        def.Parameters[this.PropertyMaps[0].TargetProperty] = parmVal;
                    }
                }
            } catch (err) {
                TW.log.error('exception populating parameter for data binding within trigger for dataBinding ' + JSON.stringify(dataBinding), err);
            }
        });
    };

    /**
     * Get the current set child data service parameters
     * @return {object} parameters with updated values to pass to the advanced grid widget
     */
    this.childDataServiceParameters = function() {
        var parameters = {};
        var bindingDef = thisWidget.getProperty('ChildDataServiceBindingDef');
        if (bindingDef) {
            var entityName = bindingDef.entityType + '_' + bindingDef.entityName;
            var target = bindingDef.target;
            thisWidget.updateServiceParameters(entityName, target);
            try {
                parameters = thisWidget.mashup.Data[entityName].ServiceInvocations[target].Parameters;
            } catch(e) {
                TW.log.warn('Error retrieving the binding definition for the TreeGrid advanced child service');
            }
        }
        return parameters;
    };

    this.attachEvents = function() {
        $('#' + gridId).on('queryGridColumns', function(event, query) {
            thisWidget.setProperty('QueryFilter', query);
            thisWidget.jqElement.triggerHandler('Filter');
        });
    };

    this.onRowDblClicked = function(rowId){
        thisWidget.jqElement.triggerHandler('DoubleClicked');
        gridAdvanced.expandOrCollapseRow(rowId, true);
    };

    this.rowSelectionCallback = function(rowIndexes, rows){
        var clonedTable = TW.InfoTableUtilities.CloneInfoTable({ "dataShape" : { "fieldDefinitions" : infoTableDataShape}, "rows" : rows });

        thisWidget.setProperty('SelectedRows', clonedTable);
        thisWidget.jqElement.triggerHandler('SelectedRowsChanged');
        // setTimeout(function() {
        //     thisWidget.updateSelection('Data', rowIndexes);
        // },1);
    };
    
    this.handleCellEditsCallback = function(stage, rows) {
        if (stage === 0) {
            thisWidget.jqElement.triggerHandler('EditCellStarted');
        }
        else if (stage === 2) {
            var editedRowsInfoTable = { "dataShape" : { "fieldDefinitions" : infoTableDataShape}, "rows" : rows };
            thisWidget.setProperty('EditedTable', editedRowsInfoTable);
            thisWidget.jqElement.triggerHandler('EditCellCompleted');
        }
    };

    this.handleGridEditsCallback = function(stage) {
        if (stage === 0) {
            thisWidget.jqElement.triggerHandler('EditStarted');
        } else if (stage === 1) {
            thisWidget.jqElement.triggerHandler('EditCompleted');
        } else if (stage === 2) {
            thisWidget.jqElement.triggerHandler('EditCancelled');
        }
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

    // callback from runtime to tell us that the selection has been changed by another widget
    // this.handleSelectionUpdate = function (propertyName, selectedRows, newSelectedRowIndices) {
        // gridAdvanced.selectRows(selectedRows, newSelectedRowIndices);
    // };
};