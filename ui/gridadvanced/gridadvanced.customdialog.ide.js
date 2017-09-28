// this will be instantiated with
// new TW.IDE.Dialogs.GridCustomEditor()

TW.IDE.Dialogs.GridAdvancedCustomEditor = function () {

    this.title = "Grid Columns";
    this.currentColDefinitions = {};
    this.existingFieldMetadata = {};

    // note: this is a little more complicated because we have the HTML already in the index.html and, as a result of being called, the ids will be duplicated
    // within index.html.  Therefore, whenever we reference them we always "fully qualify" the ids by first referencing the dom ID and then the id within the dialog

    this.renderDialogHtml = function (widgetObj) {

        var properties = widgetObj.properties;

        this.resultingShape = widgetObj.getInfotableMetadataForProperty('Data');

        var existingColFormat = properties['ColumnFormat'];
        var colFormat = undefined;

        var htmlFieldList =
            '<div class="nav-header">' +
            '<span class="grid-advanced-nav-header">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.drag-to-reorder') + '</span>' +
            '<span class="grid-advanced-show-nav-header">'+TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.show')+'</span>' +
            '<span class="grid-advanced-suppress-nav-header">'+TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.exclude')+'</span>' +
            '</div>' +
            '<ul class="nav nav-list well well-small" id="grid-config-list-ul">' ;

        var thisExistingFieldMetadata = this.existingFieldMetadata;
        var curColDefs = this.currentColDefinitions;

        // fill in the list of fields in the sequence the user has specified into the sortable list and mark them as selected
        if (existingColFormat !== undefined) {
            colFormat = existingColFormat;
            for (var i = 0; i < colFormat.formatInfo.length; i++) {
                var row = colFormat.formatInfo[i];
                if (row.inLayout === undefined){
                    row.inLayout = true;
                }
                this.currentColDefinitions[row.FieldName] = row;
                htmlFieldList +=
                          '<li>'
                                + '<a>'
		                            + '<div class="re-order"></div>'
									+ '<div class="column-name" title="' + row.FieldName + '">' + row.FieldName + '</div>'
								+ '</a>'
	                            + '<div class="visible-checkbox"><input type="checkbox" '+(row.hidden ? '' : 'checked=\"checked\"')+(row.inLayout ? '' : 'disabled')+' class="visible"/></div>'
	                            + '<div class="suppress-checkbox"><input type="checkbox" '+(row.inLayout ? '' : 'checked=\"checked\"')+' class="inLayout"/></div>'
                        + '</li>';
            }
        }

        // any other fields that are in the datashape but not configured, add those to the list and mark them as not selected
        if (this.resultingShape !== undefined) {
            for (var fieldName in this.resultingShape) {
                thisExistingFieldMetadata[fieldName] = this.resultingShape[fieldName];

                // add this field to the list if there is no column format already or if this column isn't in the column format
                if (colFormat === undefined || (curColDefs[fieldName] === undefined)) {
                    // add it in and presume it's not checked
                    htmlFieldList +=
                          '<li><a>'
							+ '<div class="re-order"></div>'
                            + '<div class="column-name" title="' + fieldName + '">' + fieldName + '</div>'
                            + '</a>' 
                            + '<div class="visible-checkbox"><input type="checkbox" class="visible"/></div>'
                            + '<div class="suppress-checkbox"><input type="checkbox" class="inLayout"/></div>'
                        + '</li>';


                    var thisColumnFormatInfo = {
                        FieldName: fieldName,
                        Title: fieldName,
                        AllowEdit: false,
                        // Editable grid not supported
                        // ValidationExpression: "",
                        // ValidationMessage: "",
                        Width: "auto",
                        HeaderFilter: "none",
                        Align: "left",
                        headerTextAlignment: "left",
                        "FormatOptions": {
                            renderer: "STRING"
                        }
                    };

                    // figure out a default renderer for this column based on the baseType of the field
                    switch (this.resultingShape[fieldName].baseType) {
                        case 'DATETIME':
                            thisColumnFormatInfo.FormatOptions.renderer = 'DATETIME';
                            break;
                        case 'LOCATION':
                            thisColumnFormatInfo.FormatOptions.renderer = 'LOCATION';
                            break;
                        case 'TAGS':
                            thisColumnFormatInfo.FormatOptions.renderer = 'TAGS';
                            break;
                        case 'HYPERLINK':
                            thisColumnFormatInfo.FormatOptions.renderer = 'HYPERLINK';
                            break;
                        case 'IMAGELINK':
                            thisColumnFormatInfo.FormatOptions.renderer = 'IMAGELINK';
                            break;
                        case 'IMAGE':
                            thisColumnFormatInfo.FormatOptions.renderer = 'IMAGE';
                            break;
                        case "NUMBER":
                            thisColumnFormatInfo.FormatOptions.renderer = 'NUMBER';
                            break;
                        case "STRING":
                            thisColumnFormatInfo.FormatOptions.renderer = 'STRING';
                            break;
                        case "BOOLEAN":
                            thisColumnFormatInfo.FormatOptions.renderer = 'BOOLEAN';
                            break;
                        case "THINGNAME":
                            thisColumnFormatInfo.FormatOptions.renderer = 'THINGNAME';
                            break;
                        case "THINGSHAPENAME":
                            thisColumnFormatInfo.FormatOptions.renderer = 'THINGSHAPENAME';
                            break;
                        case "THINGTEMPLATENAME":
                            thisColumnFormatInfo.FormatOptions.renderer = 'THINGTEMPLATENAME';
                            break;
//                        case "MASHUPNAME":
//                            thisColumnFormatInfo.FormatOptions.renderer = 'MASHUPNAME';
//                            break;
                        case "USERNAME":
                            thisColumnFormatInfo.FormatOptions.renderer = 'USERNAME';
                            break;
                        case "THINGCODE":
                            thisColumnFormatInfo.FormatOptions.renderer = 'THINGCODE';
                            break;
                        case "VEC2":
                            thisColumnFormatInfo.FormatOptions.renderer = 'VEC2';
                            break;
                        case "VEC3":
                            thisColumnFormatInfo.FormatOptions.renderer = 'VEC3';
                            break;
                        case "VEC4":
                            thisColumnFormatInfo.FormatOptions.renderer = 'VEC4';
                            break;
                        default:
                            thisColumnFormatInfo.FormatOptions.renderer = 'DEFAULT';
                    }

	                if( TW.Renderer[thisColumnFormatInfo.FormatOptions.renderer] === undefined ) {
		                thisColumnFormatInfo.FormatOptions.renderer = 'DEFAULT';
	                }
                    if (TW.Renderer[thisColumnFormatInfo.FormatOptions.renderer].defaultFormat !== undefined) {
                        thisColumnFormatInfo.FormatOptions.FormatString = TW.Renderer[thisColumnFormatInfo.FormatOptions.renderer].defaultFormat;
                    }
                    curColDefs[fieldName] = thisColumnFormatInfo;
                }
            }
            htmlFieldList += '</ul>';
        } else {
            // if we're not bound to data ... just let them know this ... there's nothing for them to do in this dialog now
            htmlFieldList += '<div>['+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.must-be-bound-to-data') +']</div></ul>';
        }

        var html =
		        '<div id="grid-config-container">'
//			        + '<div class="header">'
//				        + '<h1>Grid Configuration Dialog</h1>'
//			        + '</div>'
			        + '<div id="grid-config-list">'
						+ '<div class="grid-config-list-header btn-group">'
					        + '<button class="btn btn-mini config-list-cmd cmd-deselect-all" cmd="unselect-all">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.deselect-all') +'</button>'
					        + '<button class="btn btn-mini config-list-cmd cmd-select-all" cmd="select-all">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.select-all') +'</button>'
				        + '</div>'
				        + htmlFieldList
			        + '</div>'
			        + '<div id="grid-config">'
				        + '<div class="configuration-column">'
                            + '<div class="grid-config-tab-header">'
                                + '<h4 class="grid-column-name" id="field-name"></h4>'
                                + '<div class="tab-name selected" tab-name="column-info">'
                                    + '<span>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-format') +'</span>'
                                + '</div>'
                                + '<div class="tab-name" tab-name="column-renderer-state">'
                                    + '<span>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-renderer') +'</span>'
                                + '</div>'
                            + '</div>'
                            + '<div class="grid-config-tabs">'
                                + '<div class="column-info tab">'
                                    + '<table class="table table-striped table-bordered">'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-title') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<div id="column-display-name"></div>'
                                            + '</td>'
                                        + '</tr>'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label class="field-description-label">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.field-description') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<p class="field-description"></p>'
                                            + '</td>'
                                        + '</tr>'
                                    + '</table>'
                                    + '<h5>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.formatting-options') +'</h5>'
                                    + '<table class="table table-striped table-bordered">'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.auto-width') +'</label>'
                                            + '</td>'
                                            + '<td colspan="3">'
                                                + '<input id="auto-width" type="checkbox" checked="checked"></input><span class="field-additional-info">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-width-based-on-content') +'</span>'
                                            + '</td>'
                                        + '</tr>'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label id="width-label">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.width') +'</label>'
                                            + '</td>'
                                            + '<td colspan="3">'
                                                + '<input id="column-width" type="text" Value="120"></input><select id="column-width-format"><option value="px">px</option><option value="%">%</option></select>'
                                                + '<span class="disabled-explanation">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.disabled-explanation') +'</span>'
                                            + '</td>'
                                        + '</tr>'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label id="alignment-label">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.text-alignment') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<select id="alignment"><option value="left">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.left-aligned') +'</option><option value="right">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.right-aligned') +'</option><option value="center">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.center-aligned') +'</option></select>'
                                            + '</td>'
                                            + '<td class="grid-config-label">'
                                                + '<label id="h-alignment-label">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.header-alignment') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<select id="h-alignment"><option value="left">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.left-aligned') +'</option><option value="right">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.right-aligned') +'</option><option value="center">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.center-aligned') +'</option></select>'
                                            + '</td>'
                                        + '</tr>'
                                         + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label id="header-filter-label">Header Filter</label>'
                                            + '</td>'
                                            + '<td colspan="3">'
                                                + '<select id="header-filter-option">' 
                                                + ' <option value="none" title="Use the default filtering on the grid">No-Config</option>'
                                                + ' <option value="noDisplay" title="Use the default filtering on the grid">Don\'t display</option>'                                                
                                                + ' <option value="text_filter" title="A text filter. Retrieves values which contain mask defined through text field.">Text Filter</option>' 
                                                + ' <option value="select_filter" title="A select filter. Retrieves values which contain mask defined through dropdown list of possible values.">Select Filter</option>'
                                                + ' <option value="combo_filter" title="A filter based on the dhtmlxCombo component. Retrieves values which contain mask defined through combo box.">Combo Filter</option>'+
                                                + ' <option value="numeric_filter" title=" a text filter that allows using comparison operators in it. Retrieves values which contain mask defined through text field. ">Numeric Filter</option>'
                                                + '</select>'
                                            + '</td>'
                                        + '</tr>'
                    + '<tr>'
                + '</tr>'
                                    + '</table>'
                    /*
                                    + '<h5>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.cell-editing-options') +'</h5>'
                                    + '<table class="table table-striped table-bordered">'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label class="editable-label">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.editable') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<input id="allow-edit" type="checkbox" /><span class="field-additional-info">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.allow-edit-info') +'</span>'
                                            + '</td>'
                                        + '</tr>'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.validation-expression') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<input id="column-validation-expression" type="text" /><span class="disabled-explanation-edit">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-validation-disabled') +'</span>'
                                            + '</td>'
                                        + '</tr>'
                                        + '<tr>'
                                            + '<td class="grid-config-label">'
                                                + '<label>'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.validation-message') +'</label>'
                                            + '</td>'
                                            + '<td>'
                                                + '<div id="column-validation-message"></div><span class="disabled-explanation-edit">'+ TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.column-validation-disabled') +'</span>'
                                            + '</td>'
                                        + '</tr>'
                                    + '</table>'
                                    */
                                + '</div>'
                                + '<div id="renderer-with-state" class="column-renderer-state tab" style="display: none;">'
                                + '</div>'
                            + '</div>'
                        + '</div>'
			        + '</div>'
					+ '<div class="clear"></div>'
		        + '</div>';


        return html;
    };

    this.afterRender = function (domElementId) {
        this.jqElementId = domElementId;
        this.jqElement = $('#' + domElementId);
        var thisItem = this;


        //sets up the tabs for the column info & the renderer/state
        var gridConfigDOM = this.jqElement.find('#grid-config-container');
        gridConfigDOM.on('click','.grid-config-tab-header .tab-name',function(e) {
            e.stopPropagation();
            gridConfigDOM.find('.grid-config-tab-header .tab-name').removeClass('selected');
            var selTab = $(e.target).closest('.tab-name');
            selTab.addClass('selected');
            gridConfigDOM.find('.grid-config-tabs .tab').hide();
            gridConfigDOM.find('.grid-config-tabs').find('.tab.' + selTab.attr('tab-name')).show().addClass('selected');
        });

        //check to see if auto-width is checked

        var disableWidth = gridConfigDOM.find('#auto-width');
        var columnWidth = gridConfigDOM.find('#column-width');
        var columnWidthFormat = gridConfigDOM.find('#column-width-format');
        var disabledExplanation = gridConfigDOM.find('.disabled-explanation');
        var disabledExplanationEditable = gridConfigDOM.find('.disabled-explanation-edit');
        // Editable grid not supported
        // var columnValidationExpression = gridConfigDOM.find('#column-validation-expression');
        // var columnValidationMessage = gridConfigDOM.find('#column-validation-message');

        disableWidth.change(function() {
            if(disableWidth.is(":checked")) {
                columnWidth.attr('disabled','disabled');
                columnWidthFormat.attr('disabled','disabled');
                disableWidth.attr("checked");
                disabledExplanation.show();
            } else {
                columnWidth.removeAttr('disabled','disabled');
                columnWidthFormat.removeAttr('disabled','disabled');
                disabledExplanation.hide();
            }
        });

        //check to see if cell level editing is checked
        
    /*  Editable grid not supported
            
        var disableEditing = gridConfigDOM.find('#allow-edit');
        disableEditing.change(function() {
            if(disableEditing.is(":checked")) {
                columnValidationExpression.show();
                columnValidationMessage.show();
                disabledExplanationEditable.hide();
            } else {
                columnValidationExpression.hide();
                columnValidationMessage.hide();
                disableEditing.attr("checked");
                disabledExplanationEditable.show();

            }
        });
    */

        // limit them to typing in numbers in the column width field
        this.jqElement.find('#column-width').numeric();

        if (this.jqElement.find('#grid-config-list ul#grid-config-list-ul li').length === 0) {
            // no fields ... hide the column formatting section completely

            this.jqElement.find('#grid-config').hide();
        } else {
            // there are fields to select from and configure :)

            // make the list of fields draggable and make it so the user can't select text within the names
            this.jqElement.find('#grid-config-list ul#grid-config-list-ul').sortable().disableSelection();

            // set up what to do when the user clicks a given field in the list
            this.jqElement.find('#grid-config-list ul#grid-config-list-ul li').click(function (e) {

                // we get a click here for any html element inside the <li> ... find the appropriate li
                var liTarget = e.target;
                if (e.target.localName !== 'li') {
                    liTarget = thisItem.liFromAnyItemWithinLi(e.target);
                }

                // see if this one is already selected
                if (!$(liTarget).hasClass('active')) {
                    // not the currently selected field

                    // validate, then save whatever we have in currently selected item
                    if (thisItem.itemSelectionLeaving(thisItem.jqElement.find('#grid-config-list ul#grid-config-list-ul li.active'))) {

                        // selected a new one - remove "selected" class from all the existing ones
                        thisItem.jqElement.find('#grid-config-list ul#grid-config-list-ul li').removeClass('active');

                        // do the work to select this one
                        thisItem.itemSelected(liTarget);
                    }
                }
            });

            // select the first field in the list
            this.itemSelected(this.jqElement.find(' #grid-config-list ul#grid-config-list-ul li')[0]);

            this.jqElement.find('.config-list-cmd').click(function (e) {
                var btn = $(e.target).closest('.config-list-cmd');
                var cmd = btn.attr('cmd');

                var toState = false;
                if (cmd === 'select-all') {
                    toState = true;
                }
                var li;
                _.each(thisItem.jqElement.find('#grid-config-list ul#grid-config-list-ul li .visible-checkbox'), function (li) {
                    li = $(li);
                    if (thisItem.fieldChecked(li) !== toState && li.find('input').prop('disabled') === false) {
                        if (toState) {
                            li.find('input').prop('checked', 'checked');
                        } else {
                            li.find('input').removeAttr('checked');
                        }
                    }
                });

            });

            var colListEl = this.jqElement.find('#grid-config-list ul#grid-config-list-ul');
            // suppress field from grid
            // toggle & disable visible checkbox too: if not inLayout, it can't be visible
            colListEl.on('click', function (e) {
                var checkElem = $(e.target);
                if (checkElem.closest('.suppress-checkbox').length > 0) {
                    if (checkElem.prop('checked')) {
                        $(e.target).closest('.active').find('.visible-checkbox input').removeAttr('checked').prop('disabled', true);
                    } else {
                        $(e.target).closest('.active').find('.visible-checkbox input').prop('disabled', false);
                    }
                }
            });
        }
    };


    // helper to find the <li> from any html element inside an li
    this.liFromAnyItemWithinLi = function (domElement) {
        return $(domElement).closest('li')[0];
    };

    // save whatever is in the UI for this field
    this.itemSelectionLeaving = function (liTarget) {
        var curStateFormat;
        if (liTarget !== undefined) {
            // only validate and save it if it's checked
            if (!this.excludedFieldChecked(liTarget)) {

                // pull the column format info out of the UI
                var fieldName = this.fieldNameFromLi(liTarget);
                var autoChecked = this.jqElement.find('#auto-width').is(":checked");
                var allowEdit = this.jqElement.find('#allow-edit').is(":checked");
                var widthSpecified = this.jqElement.find('#column-width').val();
                var widthFormatSpecified = this.jqElement.find('#column-width-format').val();
                // Editable grid not supported
                // var validationExpression = this.jqElement.find('#column-validation-expression').val().trim();
                // var validationMessage = this.jqElement.find('#column-validation-message').twStdTextBox('getProperty', 'value').trim();
                var title = this.jqElement.find('#column-display-name').twStdTextBox('getProperty', 'value').trim();
                var alignment = this.jqElement.find('#alignment').val();
                var hAlignment = this.jqElement.find('#h-alignment').val();

                if (!autoChecked) {
                    if (!TW.isNumber(widthSpecified)) {
                        alert(TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.invalid-width'));
                        return false;
                    }
                }

                if (title.length === 0) {
                    alert(TW.IDE.I18NController.translate('tw.dhxgrid-customdialog-ide.invalid-title'));
                    return false;
                }

                // the jQuery plugin rendererWithStateHtml handles all the validation, etc. in a standard way
                if (this.jqElement.find('#renderer-with-state').rendererWithStateHtml('validateCurrentConfig')) {
                    curStateFormat = this.jqElement.find('#renderer-with-state').rendererWithStateHtml('getCurrentConfig');
                } else {
                    return false;
                }

                // save this column configuration
                this.currentColDefinitions[fieldName] =
                {
                    FieldName: fieldName,
                    Title: title,
                    Width: (autoChecked ? "auto" : widthSpecified + widthFormatSpecified),
                    HeaderFilter: this.jqElement.find('#header-filter-option').val(),
                    AllowEdit: (allowEdit),
                    // Editable grid not supported
                    // ValidationExpression : (validationExpression),
                    // ValidationMessage : (validationMessage),
                    Align: alignment,
                    headerTextAlignment: hAlignment,
                    "FormatOptions": curStateFormat
                };
            }
        }

        return true;
    };

    // handle selecting an item - populate the dialog on the right
    this.itemSelected = function (liTarget) {
        if (liTarget !== undefined) {
            // mark this as selected
            $(liTarget).addClass('active');

            var fieldName = this.fieldNameFromLi(liTarget);
            var curDef = this.currentColDefinitions[fieldName];
            var gridConfigDOM = this.jqElement.find('#grid-config-container');
            var disableWidth = this.jqElement.find('#auto-width');
            var disableEditing = gridConfigDOM.find('#allow-edit');
            var columnWidth = gridConfigDOM.find('#column-width');
            var columnWidthFormat = gridConfigDOM.find('#column-width-format');
            var disabledExplanation = gridConfigDOM.find('.disabled-explanation');
            var disabledExplanationEditable = gridConfigDOM.find('.disabled-explanation-edit');
            // Editable grid not supported
            // var columnValidationExpression = gridConfigDOM.find('#column-validation-expression');
            // var columnValidationMessage = gridConfigDOM.find('#column-validation-message');

            this.jqElement.find('#auto-width').prop('checked', curDef.Width === "auto" ? true : false);
            this.jqElement.find('#allow-edit').prop('checked', curDef.AllowEdit);
            this.jqElement.find('#field-name').text(fieldName);

            this.jqElement.find('#column-width').val(curDef.Width === "auto" ? "120" : parseInt(curDef.Width, 10));
            this.jqElement.find('#column-width-format').val(curDef.Width.indexOf('%') > -1 ? '%' : 'px');
            this.jqElement.find('#header-filter-option').val(curDef.HeaderFilter ? curDef.HeaderFilter : 'none');
            this.jqElement.find('#column-display-name').twStdTextBox({
	            value: curDef.Title,
	            editable: true,
	            isLocalizable: true
            });
         /* Editable grid not supported
            this.jqElement.find('#column-validation-expression').val(curDef.ValidationExpression ? curDef.ValidationExpression : "");
            this.jqElement.find('#column-validation-message').twStdTextBox({
                value: curDef.ValidationMessage || '',
                editable: true,
                isLocalizable: true
            });
         */
            this.jqElement.find('#alignment').val(curDef.Align);
            if (curDef.headerTextAlignment) {
                this.jqElement.find('#h-alignment').val(curDef.headerTextAlignment);
            } else {
                this.jqElement.find('#h-alignment').val(curDef.Align);
            }

            // the jQuery plugin rendererWithStateHtml() handles the entire renderer + state formatting using standard HTML, validation, etc. just with this one line
            this.jqElement.find('#renderer-with-state').rendererWithStateHtml({ dataShape: this.resultingShape, existingConfig: curDef.FormatOptions });

            // override the renderer type selections so that only types grid-advanced supports are displayed
            var htmlRenderChoices = '';
            var dataTypeWhiteList = ['DATETIME', 'IMAGELINK', 'STRING', 'INTEGER', 'NUMBER', 'LONG', 'BOOLEAN', 'HTML', 'HYPERLINK', 'DEFAULT'];
            if(TW.Renderer.HTML.formatSelectOptions.length == 2) {
                TW.Renderer.HTML.formatSelectOptions.push( {
                    value: 'unsanitized', 
                    text: "Unsanitized HTML"
                });
            }
            for (var rendererName in TW.Renderer) {
                if (dataTypeWhiteList.indexOf(rendererName) > -1) {
                    if (curDef.FormatOptions && rendererName === curDef.FormatOptions.renderer) {
                        htmlRenderChoices += '<option value="' + rendererName + '" selected>' + TW.Renderer[rendererName].displayName + '</option>';
                    } else {
                        htmlRenderChoices += '<option value="' + rendererName + '">' + TW.Renderer[rendererName].displayName + '</option>';
                    }

                }
            }
            $('#grid-config').find('#grid-config-renderers').empty().html(htmlRenderChoices);

            if (this.resultingShape !== undefined) {
                this.jqElement.find('.field-description').text(this.resultingShape[fieldName].description);
            } else {
                this.jqElement.find('.field-description').text('');
            }

            gridConfigDOM.find('.grid-config-tab-header .tab-name').removeClass('selected');
            gridConfigDOM.find('.grid-config-tab-header [tab-name="column-info"]').addClass('selected');
            gridConfigDOM.find('.grid-config-tabs').find('.tab.column-info').show().addClass('selected');
            gridConfigDOM.find('.grid-config-tabs').find('.tab.column-renderer-state').hide();

            if(disableWidth.is(":checked")){
                columnWidth.attr('disabled','disabled');
                columnWidthFormat.attr('disabled','disabled');
                disabledExplanation.show();
            } else {
                columnWidth.removeAttr('disabled','disabled');
                columnWidthFormat.removeAttr('disabled','disabled');
                disabledExplanation.hide();
            }

        /*  Editable grid not supported
            
            if(disableEditing.is(":checked")) {
                columnValidationExpression.show();
                columnValidationMessage.show();
                disabledExplanationEditable.hide();
            } else {
                columnValidationExpression.hide();
                columnValidationMessage.hide();
                disabledExplanationEditable.show();

            }
        */

        }
    };

    // helper method to find the field name from an li
    this.fieldNameFromLi = function (liDomElement) {
        return $(liDomElement).find('div.column-name').text()
    };

    // helper method to see if this field is checked or not
    this.fieldChecked = function (liDomElement) {
        return $($(liDomElement).find('input')).is(":checked");
    };

    // helper method to see if this field's excluded checkbox is checked or not
    this.excludedFieldChecked = function (liDomElement) {
        return $($($(liDomElement).find('.suppress-checkbox')).find('input')).is(":checked");
    };

    // user is ready to leave the dialog ... validate and save properties in the appropriate property in the property bag
    this.updateProperties = function (widgetObj) {
        // call itemSelectionLeaving() on current target and validate that it's ok before we save
        if (!this.itemSelectionLeaving(this.jqElement.find('#grid-config-list-ul .active'))) {
            return false;
        }

        // Build the hidden "ColumnFormat" property from the information we have saved locally
        var colFormat = { formatInfo: [] };
        var thisItem = this;
        // figure out which ones are checked
        this.jqElement.find('#grid-config-list .visible').each(function (index, element) {
            var thisJq = $(this);  // the visible class checkbox
            var fieldName = thisItem.fieldNameFromLi(thisItem.liFromAnyItemWithinLi(thisJq));
            thisItem.currentColDefinitions[fieldName].hidden = !thisJq.is(':checked');
            var inLayoutVal = !thisJq.parent().next().find('input').is(':checked');
            thisItem.currentColDefinitions[fieldName].inLayout = inLayoutVal;

            colFormat.formatInfo.push(thisItem.currentColDefinitions[fieldName]);
        });

	    this.jqElement.off();
	    
        // set the property
        widgetObj.setProperty('ColumnFormat', colFormat);

        return true;
    };
};
