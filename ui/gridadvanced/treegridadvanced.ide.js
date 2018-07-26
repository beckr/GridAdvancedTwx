gaRequire.require.config({
    baseUrl: '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/include'
});
TW.IDE.Widgets.treegridadvanced = function () {
    var baseTypeMap = {
        'DATETIME': 'DATETIME',
        'LOCATION': 'LOCATION',
        'TAGS': 'TAGS',
        'HYPERLINK': 'HYPERLINK',
        'IMAGELINK': 'IMAGELINK',
        'IMAGE': 'IMAGE',
        'NUMBER': 'NUMBER',
        'INTEGER': 'INTEGER',
        'LONG': 'LONG',
        'STRING': 'STRING',
        'BOOLEAN': 'BOOLEAN',
        'THINGNAME': 'THINGNAME',
        'THINGSHAPENAME': 'THINGSHAPENAME',
        'THINGTEMPLATENAME': 'THINGTEMPLATENAME',
        'MASHUPNAME': 'STRING',
        'USERNAME': 'USERNAME',
        'THINGCODE': 'THINGCODE',
        'VEC2': 'VEC2',
        'VEC3': 'VEC3',
        'VEC4': 'VEC4',
        'DEFAULT': 'DEFAULT'
    };
    var thisWidget = this,
        gridId,
        gridAdvanced;
    var locationOptions =  [{value: 'top-right',text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.location-options.top-right', 'top right')},
        {value: 'top-left',text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.location-options.top-left', 'top left')},
        {value: 'bottom-right',text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.location-options.bottom-right','bottom right')},
        {value: 'bottom-left',text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.location-options.bottom-left','bottom left')}];
    this.widgetIconUrl = function () {
        return  "../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/images/gridadvanced.ide.png";
    };

    this.widgetProperties = function () {
        return {
            'name':  TW.IDE.I18NController.translate('tw.tree-grid-advanced-ide.widget.name', 'Tree Grid Advanced'),
            'description': TW.IDE.I18NController.translate('tw.tree-grid-advanced-ide.widget.description', 'Advanced tree grid widget for displaying nested rows and columns of data'),
            'category': ['Common', 'Data'],
            'defaultBindingTargetProperty': 'Data',
            'customEditor': 'GridAdvancedCustomEditor',
            'customEditorMenuText': TW.IDE.I18NController.translate('tw.dhxgrid-ide.widget.custom-editor-menu-text'),
            'supportsAutoResize': true,
            'properties': {
                'CustomClass': {
                  'description': TW.IDE.I18NController.translate('tw.tree-grid-advanced-ide.properties.custom-class.description', 'User defined CSS class to apply to the top div of the widget. Multiple classes can be entered, separated by space.'),
                  'baseType': 'STRING',
                  'isLocalizable': false,
                  'isBindingSource': true,
                  'isBindingTarget': true,
                  'isVisible': false
                },
                'Data': {
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.data.description'),
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': true
                },
                'ChildData': {
                    'description': TW.IDE.I18NController.translate('tw.tree-grid-advanced-ide.properties.child-data.description', 'Service data to bind to the child nodes'),
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': true
                },
                'ParentIDFieldName': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.parent-id-field-name.description', 'Name of grid column containing parent id'),
                    'baseType': 'STRING',
                    'isBindingTarget': false,
                    'defaultValue': 'parentId'
                },
                'IDFieldName': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.id-field-name.description', 'Name of grid column containing primary grid key/id'),
                    'baseType': 'STRING',
                    'isBindingTarget': false,
                    'defaultValue': 'id'
                },
                'IDPathSeparator': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.id-path-separator.description', 'The ID path separator that is used in ID paths for the selection of non-loaded rows'),
                    'baseType': 'STRING',
                    'isBindingTarget': false,
                    'defaultValue': ':;'
                },
                'HasChildrenFieldName': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.has-children-field-name.description', 'Name of grid column indicating if contains child rows'),
                    'baseType': 'STRING',
                    'isBindingTarget': false,
                    'defaultValue': 'hasChildren'
                },
                'Configuration': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.configuration.description', 'Bindable property used to render the grid based on a dynamically generated configuration. Binding to this property will hide other IDE based properies for this widget.'),
                    'baseType': 'STRING',
                    'isBindingTarget': true,
                    'defaultValue': ''
                },
                'IsEditable': {
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.is-editable.description', 'Enable the ability to edit data in the grid by default'),
                    'defaultValue': false,
                    'baseType': 'BOOLEAN',
                    'isBindingTarget': true
                },
                'EnableEditButtons' : {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-edit-buttons.description', 'Enable Edit, Save, Cancel buttons in grid toolbar to allow for delayed saving of grid edits'),
                    'baseType': 'BOOLEAN',
                    'isVisible': true,
                    'defaultValue': false
                },
                'EditButtonsLocation':{
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.edit-buttons-location.description', 'The location for the grid edit buttons in the grid toolbar'),
                    'defaultValue': 'top-right',
                    'baseType':'STRING',
                    'selectOptions': locationOptions.slice()
                },
                'EditedTable': {
                    'isBindingSource': true,
                    'baseType': 'INFOTABLE',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.edited-table.description', 'Output property containing edited InfoTable rows')
                },
                'DefaultSelectedRows': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.default-selected-rows.description', 'Either a specified range (e.g. 1-10) or a comma separated list (e.g. 2,4,7,9,12-15) used to highlight rows with a \"selected\" style by default when the grid is loaded.'),
                    'baseType': 'STRING',
                    'defaultValue': '',
                    'isBindingTarget': true
                },
                'SelectedRows': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.selected-rows.description', 'Bindable property that uses an INFOTABLE as a source to determine which rows should be highlighted as \"selected\" when the grid is first loaded'),
                    'baseType': 'INFOTABLE',
                    'defaultValue': '',
                    'isBindingSource': true,
                    'isBindingTarget': true
                },
                'IncludeRowExpansionParents': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.include-row-expansion-parents.description', 'Fetch parent rows of expanded or selected rows that are not pre-loaded.'),
                    'baseType': 'BOOLEAN',
                    'defaultValue': false
                },
                'ExpandRows': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.expand-rows.description', 'InfoTable containing the list of row ids to expand.'),
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': false
                },
                'ExpandLoadedRows': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.expand-loaded-rows.description', 'Expand all initially loaded rows'),
                    'isBindingTarget': true,
                    'isEditable': true,
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'warnIfNotBoundAsTarget': false
                },
                'ExpandRowOnDoubleClick': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.expand-row-on-double-click.description', 'Expand or collapse row on double click')
                },
                'PreserveRowExpansion': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.preserve-expansion.description'),
                    'isBindingTarget': false,
                    'isEditable': true,
                    'baseType': 'BOOLEAN',
                    'warnIfNotBoundAsTarget': false,
                    'defaultValue': false
                },
                'RowSelection': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-selection.description', 'Disable row selection, enable only single row selection, or enable multiple row selection'),
                    'baseType': 'STRING',
                    'defaultValue': 'list',
                    'selectOptions': [
                        { value: 'none', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-selection.select-options.none', 'None') },
                        { value: 'single', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-selection.select-options.single', 'Single') },
                        { value: 'multi', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-selection.select-options.multi', 'Multiple') }
                    ]
                },
                'AutoScroll': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.auto-scroll.description', 'Auto scroll to the last selected row'),
                    'defaultValue': true,
                    'baseType': 'BOOLEAN'
                },
                'CookiePersistence': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.cookie-persistence.description', 'Enable client side cookie persistence for column freeze, order, sort, size and visibility'),
                    'defaultValue': true,
                    'baseType': 'BOOLEAN'
                },
                'EnableContextMenu' : {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-context-menu.description', 'Determines whether to enable or disable the context menu'),
                    'baseType': 'BOOLEAN',
                    'isVisible': true,
                    'defaultValue': true
                },
                'EnableSorting' : {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-sorting.description', 'Determines whether to enable or disable column sorting'),
                    'baseType': 'BOOLEAN',
                    'isVisible': true,
                    'defaultValue': false
                },
                'MultiColumnSortOrder': {
                    'isVisible': true,
                    'baseType': 'STRING',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.multi-column-sort-order.description', 'Set default multi-colum sort order using column field names, e.g. \"name:asc,office:des,id:des\"')
                },
                'ClientSideSorting' : {
                    'description': "If set to true, the sorting happens on client rather than server",
                    'baseType': 'BOOLEAN',
                    'isVisible': true,
                    'defaultValue': false
                },
                'EnableBlockSelection' : {
                    'description': "Enable block selection and copy paste",
                    'baseType': 'BOOLEAN',
                    'isVisible': true,
                    'defaultValue': false
                },
                'EnableGridSearch': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-grid-search.description', 'Enable a search input field for global grid search')
                },
                'GridSearchLocation': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.grid-search-location.description', 'Location for the search box relative to the grid'),
                    'defaultValue': 'top-left',
                    'baseType': 'STRING',
                    'selectOptions': locationOptions.slice()
                },
                'QueryFilter' : {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.query-filter.description', 'Bindable property to be used as a filter query for a data service'),
                    'baseType': 'QUERY',
                    'isVisible': true,
                    'isEditable': false,
                    'isBindingSource': true,
                    'isBindingTarget': true
                },
                'EnableGridReset': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-grid-reset.description', 'Enable a toolbar button for clearing the user cookie configurations, resetting the grid to it\'s default configuration')
                },
                'EnableFilterEventOnConfigChange': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': true,
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-filter-event-on-config-change.description', 'When enabled, fire the Filter event when a grid configuration update from a service occurs.')
                },
                'EnableFiltering': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': true,
                    'description': 'Enable grid filtering'
                },
				'FilteringType': {
					'baseType': 'STRING',
					'description': "The type of filtering to use",
					'default_value': 'text_filter',
                    'selectOptions': [
                        {'value': 'text_filter', text: 'Text Filter'},
                        {'value': 'text_wildcard_filter', text: 'Text Wildcard filter'},
                        {'value': 'select_filter', text: 'Select Filter'},
                        {'value': 'combo_filter', text: 'Combo Filter'},
                        {'value': 'numeric_filter', text: 'Numeric filter'}
					]
				},
                'EnableFooter': {
                    'baseType': 'BOOLEAN',
                    'defaultValue': false,
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.enable-footer.description', 'When enabled, shows a footer in the grid with data bound from the FooterData property')
                },
                'FooterData': {
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.footer-data.description','InfoTable containing data to display in the footer of the grid.'),
                    'isBindingTarget': true,
                    'isEditable': false,
                    'baseType': 'INFOTABLE',
                    'warnIfNotBoundAsTarget': true,
                    'isVisible': false
                },
                'GridResetButtonLocation': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.grid-reset-button-location.description', 'The location for the grid reset button'),
                    'defaultValue': 'top-right',
                    'baseType': 'STRING',
                    'selectOptions': locationOptions.slice()
                },
                // 'ClientPagination': {
                //     'description': 'enable client pagination to speed browser performance',
                //     'defaultValue': true,
                //     'baseType': 'BOOLEAN'
                // },
                // 'RowsPerPage': {
                //     'description': 'Max rows displayed in table at one time.',
                //     'defaultValue': 25,
                //     'baseType': 'NUMBER',
                //     'selectOptions': [
                //         { value: 5,  text: 5 },
                //         { value: 10, text: 10 },
                //         { value: 25, text: 25 },
                //         { value: 50, text: 50 },
                //         { value: 100, text: 100 }
                //     ]
                // },
                // 'PaginationControls':{
                //     'description':'User Interface Control Options',
                //     'defaultValue': 'numbers',
                //     'baseType':'STRING',
                //     'selectOptions':[
                //         {value: 'simple',text:'first, previous, next, last'},
                //         {value: 'simple_numbers',text:'first, previous, totals, next, last'},
                //         {value: 'full_numbers',text:'first, previous, totals, next, last, page numbers'},
                //         {value: 'full',text:'first, previous, totals, next, last, page numbers, rows per page'}
                //     ]
                // },
                // 'PaginationButtons': {
                //     'description': 'Maximum number of page buttons to show.',
                //     'selectOptions': [
                //         { value: 2, text: 2 },
                //         { value: 3, text: 3 },
                //         { value: 4, text: 4 },
                //         { value: 5, text: 5 },
                //         { value: 6, text: 6 },
                //         { value: 7, text: 7 },
                //         { value: 8, text: 8 },
                //         { value: 9, text: 9 },
                //         { value: 10, text: 10 }
                //     ],
                //     'baseType': 'NUMBER'
                // },
                // 'PaginationLocation':{
                //     'description':'User Interface Control Location Relative to Grid',
                //     'defaultValue': 'bottom-left',
                //     'baseType':'STRING',
                //     'selectOptions':locationOptions.slice()
                // },
                'Width': {
                    'defaultValue': 400,
                    'description': TW.IDE.I18NController.translate('tw.label-ide.properties.width.description')
                },
                'Height': {
                    'defaultValue': 200,
                    'description': TW.IDE.I18NController.translate('tw.label-ide.properties.height.description')
                },
                'ColumnFormat': {
                    'isVisible': false,
                    'baseType': 'STRING'
                },
                'RowFormat': {
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-format.description'),
                    'baseType': 'STATEFORMATTING',
                    'baseTypeInfotableProperty': 'Data'    // which property's datashape to use and require being bound in order to configure the renderer, etc.
                },
                'TableWrapperStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedWrapperStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.table-wrapper-style.description', 'Table wrapper style')
                },
                'TableHeaderStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedHeaderStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.grid-header-style.description')
                },
                'FocusStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultFocusStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.focus-style.description')
                },
                'RowBackgroundStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedRowBackgroundStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-background-style.description')
                },
                'RowAlternateBackgroundStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedRowAlternateBackgroundStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-alternate-background-style.description')
                },
                'RowHoverStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedRowHoverStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-hover-style.description')
                },
                'RowSelectedStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedRowSelectedStyle',
                    'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-selected-style.description')
                },
                'CellBorderStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedCellBorderStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.cell-border-style.description', 'Cell border style applies a line color to the left and right borders.')
                },
                'RowBorderStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedRowBorderStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-border-style.description', 'Row border style applies a line color to the bottom cell border.')
                },
                'ToolbarStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultToolbarStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.toolbar-style.description', 'Toolbar style')
                },
                'TableFooterStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultGridAdvancedFooterStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.table-footer-style.description', 'Footer style')
                },
                // 'PaginationButtonStyle': {
                //     'baseType': 'STYLEDEFINITION',
                //     'defaultValue': 'DefaultPaginationButtonStyle',
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-selected-style.description')
                // },
                // 'PaginationHoverStyle': {
                //     'baseType': 'STYLEDEFINITION',
                //     'defaultValue': 'DefaultPaginationHoverStyle',
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-hover-style.description')
                // },
                // 'PaginationSelectedStyle': {
                //     'baseType': 'STYLEDEFINITION',
                //     'defaultValue': 'DefaultPaginationSelectedStyle',
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.row-hover-style.description')
                // },
                'TooltipStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultTooltipStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.tooltip-style.description', 'Tooltip style')
                },
                'SortAscendingStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultSortAscendingStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.sort-ascending-style.description', 'Sort Ascending Style')
                },
                'SortDescendingStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultSortDescendingStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.sort-descending-style.description', 'Sort Descending Style')
                },
                'RowIconStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultRowIconStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-icon-style.description', 'Row Icon Style')
                },
                'RowExpansionIconStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultRowExpansionIconStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-expansion-icon-style.description', 'Row Expansion Icon Style')
                },
                'RowCollapseIconStyle': {
                    'baseType': 'STYLEDEFINITION',
                    'defaultValue': 'DefaultRowCollapseIconStyle',
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.row-collapse-icon-style.description', 'Row Collapse Icon Style')
                },
                'HeaderOverflow': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.description', 'How to display text in the grid header that extends outside it\'s containing cell'),
                    'baseType': 'STRING',
                    'defaultValue': 'tooltip',
                    'selectOptions': [
                        { value: 'fitted', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.select-options.fitted', 'Fitted') },
                        { value: 'wrapped', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.select-options.wrapped', 'Wrapped') },
                        { value: 'clipped', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.select-options.clipped', 'Clipped') },
                        { value: 'ellipsis', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.select-options.ellipsis', 'Ellipsis') },
                        { value: 'tooltip', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.header-overflow.select-options.tooltip', 'Tooltip') }
                    ]
                },
                'DataOverflow': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.description', 'How to display text in the grid body that extends outside it\'s containing cell'),
                    'baseType': 'STRING',
                    'defaultValue': 'clipped',
                    'selectOptions': [
                        { value: 'fitted', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.select-options.fitted', 'Fitted') },
                        { value: 'wrapped', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.select-options.wrapped', 'Wrapped') },
                        { value: 'clipped', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.select-options.clipped', 'Clipped') },
                        { value: 'ellipsis', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.select-options.ellipsis', 'Ellipsis') },
                        { value: 'tooltip', text: TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.data-overflow.select-options.tooltip', 'Tooltip') }
                    ]
                },
                'MaxHeaderHeight': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.max-header-height.description', 'The maximum height (in pixels) the header should be allowed to expand to. If text expands beyond, it will get a vertical scrollbar'),
                    'baseType': 'NUMBER',
                    'defaultValue': 100
                },
                'MinRowHeight': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.min-row-height.description', 'The minimum height (in pixels) table rows should be allowed to display'),
                    'baseType': 'NUMBER',
                    'defaultValue': 30
                },
                'ConfigurationId': {
                    'baseType': 'NUMBER',
                    'isVisible': false,
                    'defaultValue': 0
                },
                // 'ClosedNodeFormat': {
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.closed-node-format.description'),
                //     'baseType': 'STATEFORMATTING',
                //     'baseTypeInfotableProperty': 'Data'    // which property's datashape to use and require being bound in order to configure the renderer, etc.
                // },
                // 'OpenNodeFormat': {
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.open-node-format.description'),
                //     'baseType': 'STATEFORMATTING',
                //     'baseTypeInfotableProperty': 'Data'    // which property's datashape to use and require being bound in order to configure the renderer, etc.
                // },
                // 'NodeImageFormat': {
                //     'description': TW.IDE.I18NController.translate('tw.dhxgrid-ide.properties.node-image-format.description'),
                //     'baseType': 'STATEFORMATTING',
                //     'baseTypeInfotableProperty': 'Data'    // which property's datashape to use and require being bound in order to configure the renderer, etc.
                // },
                // 'AddRows': {
                //     'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.add-rows.description'),
                //     'isBindingTarget': true,
                //     'isEditable': false,
                //     'baseType': 'INFOTABLE',
                //     'warnIfNotBoundAsTarget': false
                // },
                // 'DeleteRows': {
                //     'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.delete-rows.description'),
                //     'isBindingTarget': true,
                //     'isEditable': false,
                //     'baseType': 'INFOTABLE',
                //     'warnIfNotBoundAsTarget': false
                // },
                'MaxRowCacheSize': {
                    'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.properties.max-row-cache-size.description'),
                    'selectOptions': [
                        {value: 10000, text: 10000},
                        {value: 25000, text: 25000},
                        {value: 50000, text: 50000},
                        {value: 100000, text: 100000}
                    ],
                    'defaultValue': 50000,
                    'baseType': 'NUMBER'
                },
                WrapsTextInColumns: {
                    baseType: 'BOOLEAN',
                    defaultValue: false
                },
                EmptyCellText: {
                    baseType: 'STRING',
                    defaultValue: ''
                }
            }
        }
    };

    this.getSourceDatashape = function(propertyName) {
        var infoTableDataShape = this.getInfotableMetadataForProperty('Data');
        return infoTableDataShape;
    };

    this.widgetEvents = function () {
        return {
            'DoubleClicked': {'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.double-clicked.description', 'Event triggered when a row has been double clicked') },
            'Filter': { 'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.filter.description', 'Event triggered when there is either a text search or a sort performed') },
            'SelectedRowsChanged': { 'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.selected-rows-changed.description', 'Event triggered when row selections are updated') },
            'EditCellStarted': { 'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.edit-cell-started.description', 'Event triggered when a user starts editing a cell in the grid') },
            'EditCellCompleted': { 'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.edit-cell-completed.description', 'Event triggered when a user finishes editing a cell in the grid')},
            'EditStarted':       {'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.edit-start.description', 'Event triggered when a user clicks the Edit button in the grid')},
            'EditCompleted':     {'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.edit-save.description', 'Event triggered when a user clicks the Save button in the grid')},
            'EditCancelled':     {'description': TW.IDE.I18NController.translate('tw.grid-advanced-ide.events.edit-cancel.description', 'Event triggered when a user clicks the Cancel button in the grid')}
        };
    };

    // afterRemoveBindingSource is called immediately after the user removes a binding source to your object
    this.afterRemoveBindingSource = function (bindingInfo){
        if (bindingInfo['targetProperty'] === 'Configuration') {
            var allWidgetProps = this.allWidgetProperties();
            allWidgetProps['customEditor'] = 'GridAdvancedCustomEditor';
            this.toggleConfigurationProperties(true);
            this.toggleNoDataOverlay(true);
            this.togglePaginationContainer(false);
            this.updateBoundProperties();
        }
        if (bindingInfo['targetProperty'] === 'Data'){
            this.toggleNoDataOverlay(true);
            this.togglePaginationContainer(false);
            this.updateBoundProperties();
        }
        if (bindingInfo['targetProperty'] === 'ChildData'){
            this.setProperty('ChildDataServiceBindingDef', undefined);
            this.updateBoundProperties();
        }
        if (bindingInfo['targetProperty'] === 'FooterData'){
            this.toggleNoDataOverlay(true);
            this.togglePaginationContainer(false);
            this.updateBoundProperties();
            this.buildGrid();
        }
    };

    // afterAddBindingSource is called immediately after the user adds a binding source to your object
    this.afterAddBindingSource = function (bindingInfo) {
        if (bindingInfo['targetProperty'] === 'Data') {
            var infoTableDataShape = this.getInfotableMetadataForProperty('Data');
            TW.IDE.updateWidgetPropertiesWindow();

            var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(thisWidget.properties.Area, thisWidget.properties.Id);
            if(bindings && bindings.length > 0) {
                bindings.forEach(function(binding) {
                    if(!binding.PropertyMaps || binding.PropertyMaps.length == 0 || !binding.SourceSection || !binding.SourceId){
                        return;
                    }
                    var target = TW.IDE.Workspace.Mashups.Current.findDataServiceByDataAndDataServiceName(binding.SourceSection, binding.SourceId).Target;
                    var bindingDef = TW.IDE.Workspace.Mashups.Current.Data[binding.SourceSection];
                    switch(binding.PropertyMaps[0].TargetProperty){
                        case 'Data':
                            thisWidget.createServiceInvokerParams('DataServiceBindingDef', bindingDef, target);
                            break;
                    }
                });
            }

            var resetColumnFormat = true;

            var curColFormat = this.getProperty('ColumnFormat');
            if (curColFormat !== undefined && curColFormat.formatInfo !== undefined && curColFormat.formatInfo.length > 0 && infoTableDataShape !== undefined) {
                // see if we have column format that's worth trying to save
                resetColumnFormat = this.checkColumnFormats(curColFormat.formatInfo, infoTableDataShape);
            }

            if (resetColumnFormat) {
                this.resetColumnFormat(infoTableDataShape);
            }
            this.buildGrid();
        }
        if (bindingInfo['targetProperty'] === 'ChildData') {
            var infoTableDataShape = this.getInfotableMetadataForProperty('ChildData');
            TW.IDE.updateWidgetPropertiesWindow();

            var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(thisWidget.properties.Area, thisWidget.properties.Id);
            if (bindings && bindings.length > 0) {
                bindings.forEach(function (binding) {
                    if(!binding.PropertyMaps || binding.PropertyMaps.length == 0 || !binding.SourceSection || !binding.SourceId){
                        return;
                    }
                    var target = TW.IDE.Workspace.Mashups.Current.findDataServiceByDataAndDataServiceName(binding.SourceSection, binding.SourceId).Target;
                    var bindingDef = TW.IDE.Workspace.Mashups.Current.Data[binding.SourceSection];
                    switch (binding.PropertyMaps[0].TargetProperty) {
                        case 'ChildData':
                            thisWidget.createServiceInvokerParams('ChildDataServiceBindingDef', bindingDef, target);
                            break;
                    }
                });
            }
        }
        if (bindingInfo['targetProperty'] === 'FooterData') {
            var infoTableDataShape = this.getInfotableMetadataForProperty('FooterData');
            TW.IDE.updateWidgetPropertiesWindow();

            var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(thisWidget.properties.Area, thisWidget.properties.Id);
            if(bindings && bindings.length > 0) {
                bindings.forEach(function(binding) {
                    if (!binding.PropertyMaps || binding.PropertyMaps.length == 0 || !binding.SourceSection || !binding.SourceId) {
                        return;
                    }
                    var target = TW.IDE.Workspace.Mashups.Current.findDataServiceByDataAndDataServiceName(binding.SourceSection, binding.SourceId).Target;
                    var bindingDef = TW.IDE.Workspace.Mashups.Current.Data[binding.SourceSection];
                    switch(binding.PropertyMaps[0].TargetProperty){
                        case 'FooterData':
                            thisWidget.createServiceInvokerParams('DataServiceBindingDef', bindingDef, target);
                            break;
                    }
                });
            }
            this.buildGrid();
        }
        if (bindingInfo['targetProperty'] === 'Configuration') {
            if(this.isPropertyBoundAsTarget('Configuration')) {
                var allWidgetProps = this.allWidgetProperties();
                allWidgetProps['customEditor'] = undefined;
                this.toggleConfigurationProperties(false);
                // Use the configuration from a service instead of from Mashup Builder UI:
                this.buildGrid();
            }
        }
        return true;
    };

    // returns true if the column format needs to be reset
    this.checkColumnFormats = function(formatInfo, infoTableDataShape){
        for (var i = 0; i < formatInfo.length; i++) {
            var curFld = formatInfo[i];
            var curFldName = curFld.FieldName;
            var found = false;
            for (var fieldName in infoTableDataShape) {
                if (fieldName === curFldName) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                // field not found ... blow off the format
                return true;
            }
        }
    };

    // Reset the column format after adding a binding source if the data has changed.
    this.resetColumnFormat = function (infoTableDataShape){
        // start out resetting the ColumnFormat ... i.e. delete anything that's already there
        // this.setProperty('ColumnFormat', undefined);

        if (infoTableDataShape !== undefined) {
            var sortedDataShape;
            sortedDataShape = _.sortBy(infoTableDataShape, function(val, key, obj){
                return val['name'].toLowerCase();
            });
            sortedDataShape = _.sortBy(sortedDataShape, function(val, key, obj){
                return (val['ordinal'] || 0);
            });
            // build the ColumnFormat based on that DataShape
            var colFormat = { formatInfo: [] };
            _.each(sortedDataShape, function(fieldDef, key, list){
                var thisColumnFormatInfo = {
                    FieldName: fieldDef.name,
                    Title: fieldDef.name,
                    Width: "auto",
                    AllowEdit: false,
                    ValidationExpression : "",
                    ValidationMessage : "",
                    Align: "left",
                    "FormatOptions": {
                        renderer: "STRING"
                    }
                };

                if(baseTypeMap[fieldDef.baseType] !== undefined){
                    thisColumnFormatInfo.FormatOptions.renderer = baseTypeMap[fieldDef.baseType];
                }else{
                    thisColumnFormatInfo.FormatOptions.renderer = baseTypeMap['DEFAULT'];
                }
                // if you update this, also update dhxgrid.runtime.js to update the defaults at runtime
                switch (fieldDef.baseType) {
                    case "NUMBER":
                        thisColumnFormatInfo.Align = 'right';
                        break;
                }
                if (TW.Renderer[thisColumnFormatInfo.FormatOptions.renderer].defaultFormat !== undefined) {
                    thisColumnFormatInfo.FormatOptions.FormatString = TW.Renderer[thisColumnFormatInfo.FormatOptions.renderer].defaultFormat;
                }
                colFormat.formatInfo.push(thisColumnFormatInfo);
            });

            // set the ColumnFormat property based on this InfoTableShape
            this.setProperty('ColumnFormat', colFormat);
        }
    };

    //used validate property value before assigning
    this.beforeSetProperty = function (name, value){

    };

    // called whenever any property is set ... return true if we want to be re-rendered based on the change
    this.afterSetProperty = function (name, value) {
        var allWidgetProps = this.allWidgetProperties(),
            result = false;

        switch (name) {
            case 'RowSelection':
                allWidgetProps['properties']['AutoScroll']['isVisible'] = this.getProperty('RowSelection') !== 'none';
                this.updatedProperties();
                result = true;
                break;
            case 'Width':
            case 'Height':
            case 'ColumnFormat':
            	var configId = this.properties['ConfigurationId'];
            	this.setProperty('ConfigurationId', (configId + 1));
            	break;
            case 'GridHeaderStyle':
            case 'RowBackgroundStyle':
            case 'RowAlternateBackgroundStyle':
            case 'RowHoverStyle':
            case 'RowSelectedStyle':
            case 'GridBackgroundStyle':
            case 'TableFooterStyle':
            case 'GridHeaderTextCase':
            case 'EnableGridReset':
            	allWidgetProps['properties']['GridResetButtonLocation']['isVisible'] = this.getProperty('EnableGridReset');
                this.updatedProperties();
                result = true;
                break;
            case 'EnableGridSearch':
            	allWidgetProps['properties']['GridSearchLocation']['isVisible'] = this.getProperty('EnableGridSearch');
            	allWidgetProps['properties']['QueryFilter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
                allWidgetProps['properties']['Filter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
                this.updatedProperties();
                result = true;
                break;
            case 'IsEditable':
                allWidgetProps['properties']['EnableEditButtons']['isVisible'] = !this.getProperty('IsEditable');
                allWidgetProps['properties']['EditButtonsLocation']['isVisible'] = !this.getProperty('IsEditable');
                allWidgetProps['properties']['EditStarted']['isVisible'] = !this.getProperty('IsEditable');
                allWidgetProps['properties']['EditCompleted']['isVisible'] = !this.getProperty('IsEditable');
                allWidgetProps['properties']['EditCancelled']['isVisible'] = !this.getProperty('IsEditable');
                this.updatedProperties();
                result = true;
                break;
            case 'EnableEditButtons':
                allWidgetProps['properties']['EditButtonsLocation']['isVisible'] = this.getProperty('EnableEditButtons');
                allWidgetProps['properties']['IsEditable']['isVisible'] = !this.getProperty('EnableEditButtons');
                allWidgetProps['properties']['EditCellStarted']['isVisible'] = !this.getProperty('EnableEditButtons');
                allWidgetProps['properties']['EditCellCompleted']['isVisible'] = !this.getProperty('EnableEditButtons');
                this.updatedProperties();
                result = true;
                break;
            case 'EnableSorting':
            	allWidgetProps['properties']['QueryFilter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
                allWidgetProps['properties']['Filter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
                this.updatedProperties();
                result = true;
                break;
            case 'ClientPagination':
                //control visibility of dependant properties
                allWidgetProps['properties']['RowsPerPage']['isVisible'] = this.getProperty('ClientPagination');
                allWidgetProps['properties']['PaginationControls']['isVisible'] = this.getProperty('ClientPagination');
                allWidgetProps['properties']['RowFormat']['isVisible'] = this.getProperty('ClientPagination');
                allWidgetProps['properties']['PaginationLocation']['isVisible'] = this.getProperty('ClientPagination');
                this.updatedProperties();
                result = true;
            case 'PaginationLocation':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'GridSearchLocation':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'GridResetButtonLocation':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'EditButtonsLocation':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'PaginationControls':
                var visible = (this.getProperty('PaginationControls') !== 'simple' &&
                this.getProperty('PaginationControls') !== 'simple_numbers');
                allWidgetProps['properties']['PaginationButtons']['isVisible'] = visible;
                this.updatedProperties();
                result = true;
                break;
            case 'RowIconStyle':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'RowExpansionIconStyle':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'RowCollapseIconStyle':
                this.positionContainers();
                this.updatedProperties();
                result = true;
                break;
            case 'EnableFooter' :
                allWidgetProps['properties']['FooterData']['isVisible'] = this.getProperty('EnableFooter') === true;
                allWidgetProps['properties']['TableFooterStyle']['isVisible'] = this.getProperty('EnableFooter') === true;
                this.updatedProperties();
                result = true;
                break;
            case 'Style':
                result = false;
                break;
            default:
                break;
        }

        setTimeout(function() {
            if (!result) {
                thisWidget.buildGrid();
                thisWidget.getPropertyConfig();
            }
        }, 500);
        return result;
    };

    this.toggleConfigurationProperties = function(visible) {
        var allWidgetProps = this.allWidgetProperties();
        // allWidgetProps['properties']['RowsPerPage']['isVisible'] = visible;
        allWidgetProps['properties']['DefaultSelectedRows']['isVisible'] = visible;
        // allWidgetProps['properties']['ClientPagination']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationControls']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationLocation']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationButtons']['isVisible'] = visible;
        allWidgetProps['properties']['EnableGridSearch']['isVisible'] = visible;
        allWidgetProps['properties']['EnableEditButtons']['isVisible'] = visible;
        allWidgetProps['properties']['GridResetButtonLocation']['isVisible'] = visible;
        allWidgetProps['properties']['GridSearchLocation']['isVisible'] = visible;
        allWidgetProps['properties']['EditButtonsLocation']['isVisible'] = visible;
        allWidgetProps['properties']['RowFormat']['isVisible'] = visible;
        allWidgetProps['properties']['RowSelection']['isVisible'] = visible;
        allWidgetProps['properties']['AutoScroll']['isVisible'] = visible;
        allWidgetProps['properties']['HeaderOverflow']['isVisible'] = visible;
        allWidgetProps['properties']['DataOverflow']['isVisible'] = visible;
        allWidgetProps['properties']['TableWrapperStyle']['isVisible'] = visible;
        allWidgetProps['properties']['TableHeaderStyle']['isVisible'] = visible;
        allWidgetProps['properties']['TableFooterStyle']['isVisible'] = visible;
        allWidgetProps['properties']['EnableFooter']['isVisible'] = visible;
        allWidgetProps['properties']['FocusStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowBackgroundStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowAlternateBackgroundStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowHoverStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowSelectedStyle']['isVisible'] = visible;
        allWidgetProps['properties']['CellBorderStyle']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationButtonStyle']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationHoverStyle']['isVisible'] = visible;
        // allWidgetProps['properties']['PaginationSelectedStyle']['isVisible'] = visible;
        allWidgetProps['properties']['MultiColumnSortOrder']['isVisible'] = visible;
        allWidgetProps['properties']['MaxHeaderHeight']['isVisible'] = visible;
        allWidgetProps['properties']['MinRowHeight']['isVisible'] = visible;
        allWidgetProps['properties']['TooltipStyle']['isVisible'] = visible;
        allWidgetProps['properties']['ToolbarStyle']['isVisible'] = visible;
        allWidgetProps['properties']['SortAscendingStyle']['isVisible'] = visible;
        allWidgetProps['properties']['SortDescendingStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowIconStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowExpansionIconStyle']['isVisible'] = visible;
        allWidgetProps['properties']['RowCollapseIconStyle']['isVisible'] = visible;
        // allWidgetProps['properties']['SplitColumnIndex']['isVisible'] = visible;
        allWidgetProps['properties']['MaxRowCacheSize']['isVisible'] = visible;
        allWidgetProps['properties']['ParentIDFieldName']['isVisible'] = visible;
        allWidgetProps['properties']['IDFieldName']['isVisible'] = visible;
        allWidgetProps['properties']['HasChildrenFieldName']['isVisible'] = visible;
        allWidgetProps['properties']['EnableSorting']['isVisible'] = visible;
        allWidgetProps['properties']['ExpandLoadedRows']['isVisible'] = visible;
        allWidgetProps['properties']['PreserveRowExpansion']['isVisible'] = visible;
        allWidgetProps['properties']['ExpandRowOnDoubleClick']['isVisible'] = visible;
        allWidgetProps['properties']['IsEditable']['isVisible'] = visible;
        allWidgetProps['properties']['EnableContextMenu']['isVisible'] = visible;
    };

    this.renderHtml = function () {
        // gridId includes "-preview" because the base class auto adds the id to the element with "widget-content"
        gridId = thisWidget.getProperty('Id') + '-preview';
        return '<div class="widget-content widget-gridadvanced"><div class="no-data"><span>' + TW.IDE.I18NController.translate('tw.dhxgrid-ide.must-be-bound-to-data') + '</span></div>'+
            '<div id="' + gridId + '-top-container" class="grid-control-container"></div>' +
            '<div id="' + gridId + '-bottom-container" class="grid-control-container"></div>' +
            '<div id="' + gridId + '"></div><div class="overlay"></div></div>';
    };

    this.afterRender = function(){
        this.toggleNoDataOverlay(true);
        var allWidgetProps = this.allWidgetProperties();
        if(this.isPropertyBoundAsTarget('Configuration')) {
            allWidgetProps['customEditor'] = undefined;
        }
        allWidgetProps['properties']['QueryFilter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
        allWidgetProps['properties']['Filter']['isVisible'] = this.getProperty('EnableGridSearch') || this.getProperty('EnableSorting');
        allWidgetProps['properties']['AutoScroll']['isVisible'] = this.getProperty('RowSelection') !== 'none';

        allWidgetProps['properties']['EnableEditButtons']['isVisible'] = this.getProperty('IsEditable') === false;
        allWidgetProps['properties']['EditButtonsLocation']['isVisible'] = this.getProperty('EnableEditButtons') === true && this.getProperty('IsEditable') === false;
        allWidgetProps['properties']['IsEditable']['isVisible'] = this.getProperty('EnableEditButtons') === false;
        allWidgetProps['properties']['EditStarted']['isVisible'] = !this.getProperty('IsEditable');
        allWidgetProps['properties']['EditCompleted']['isVisible'] = !this.getProperty('IsEditable');
        allWidgetProps['properties']['EditCancelled']['isVisible'] = !this.getProperty('IsEditable');
        allWidgetProps['properties']['EditCellStarted']['isVisible'] = !this.getProperty('EnableEditButtons');
        allWidgetProps['properties']['EditCellCompleted']['isVisible'] = !this.getProperty('EnableEditButtons');
        allWidgetProps['properties']['FooterData']['isVisible'] = this.getProperty('EnableFooter') === true;
        allWidgetProps['properties']['TableFooterStyle']['isVisible'] = this.getProperty('EnableFooter') === true;



        gaRequire.define("jquery", function () {
            //drop the `true` if you want jQuery (but not $) to remain global
            return $;
        });
        gaRequire.require.config({waitSeconds: 30});
        gaRequire.require(["grid-advanced-widget","dhtmlx-bundle"], function() {
            gaRequire.require(["dhtmlx-tree-bundle"], function() {

                gaRequire.requirejs(['jquery',
                        'tw-grid-advanced/grid-advanced/tw-grid-advanced',
                        'tw-grid-advanced/grid-advanced/configuration-parser-factory',
                        'tw-grid-advanced/grid-advanced/tooltip/tooltip-factory',
                        'dhxtreegrid'
                    ],
                    function() {
                        thisWidget.TwGridAdvanced = arguments[1].TwGridAdvanced;
                        thisWidget.ConfigurationParserFactory = arguments[2].ConfigurationParserFactory;
                        thisWidget.TooltipFactory = arguments[3].TooltipFactory;
                        thisWidget.buildGrid();
                        thisWidget.createServiceInvokers();
                    });
            });
        });
        var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(thisWidget.properties.Area, thisWidget.properties.Id);
        if (bindings && bindings.length > 0) {
            bindings.forEach(function(binding) {
                if (binding.PropertyMaps && binding.PropertyMaps.length > 0) {
                    binding.PropertyMaps.forEach(function(props) {
                        if (props.TargetProperty === 'Configuration') {
                            thisWidget.toggleConfigurationProperties(false);
                        }
                    });
                }
            });
        }
    };

    this.createServiceInvokers = function() {
        var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(thisWidget.properties.Area, thisWidget.properties.Id);
        if(bindings && bindings.length > 0) {
            var binding = bindings[0];
            if(!binding.PropertyMaps || binding.PropertyMaps.length == 0 || !binding.SourceSection || !binding.SourceId){
                return;
            }
            var target = TW.IDE.Workspace.Mashups.Current.findDataServiceByDataAndDataServiceName(binding.SourceSection, binding.SourceId).Target;
            var bindingDef = TW.IDE.Workspace.Mashups.Current.Data[binding.SourceSection];
            switch (binding.PropertyMaps[0].TargetProperty) {
                case 'Data':
                    thisWidget.createServiceInvokerParams('DataServiceBindingDef', bindingDef, target);
                    break;
                case 'ChildData':
                    thisWidget.createServiceInvokerParams('ChildDataServiceBindingDef', bindingDef, target);
                    break;
                case 'FooterData':
                    thisWidget.createServiceInvokerParams('DataServiceBindingDef', bindingDef, target);
                    break;
                case 'Configuration':
                    thisWidget.toggleConfigurationProperties(false);
                    break;
            }
        }
    };

    this.createServiceInvokerParams = function(targetProperty, binding, target) {
        var serviceInvokerParams = {
            entityType: binding.EntityType,
            entityName: binding.EntityName,
            target: target
        };
        this.setProperty(targetProperty, serviceInvokerParams);
    };

    this.buildGrid = function(){
        // remove it if it already exists, and reset the dimensions
        if(gridAdvanced){
            gridAdvanced.destroy();
        }
        gridAdvanced = new thisWidget.TwGridAdvanced(gridId, $.noop, true);
        gridAdvanced.imagePath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/imgs/';
        gridAdvanced.menuIconsPath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/common/images/';
        gridAdvanced.structPath = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/common/';
        thisWidget.getPropertyConfig();
        thisWidget.updateBoundProperties();
        gridAdvanced.tooltip = thisWidget.TooltipFactory.getTooltip('mashup-builder');
        gridAdvanced.localizationUtil = function(token) {
            var val = TW.Runtime.convertLocalizableString(Encoder.htmlEncode(token)).replace(/,/g,'&#44;');
            return val;
        };
        thisWidget.notifyWidgetsOfIdeResize = function () {
            gridAdvanced.resize();
        };
        var l8nTokens = {
            search: TW.Runtime.convertLocalizableString('[[search]]') == '???' ? 'Search' : TW.Runtime.convertLocalizableString('[[search]]') ,
            reset: TW.Runtime.convertLocalizableString('[[reset]]') === '???' ? 'Reset' : TW.Runtime.convertLocalizableString('[[reset]]'),
            edit: TW.Runtime.convertLocalizableString('[[edit]]') === '???' ? 'Edit' : TW.Runtime.convertLocalizableString('[[edit]]'),
            save: TW.Runtime.convertLocalizableString('[[save]]') === '???' ? 'Save' : TW.Runtime.convertLocalizableString('[[save]]'),
            cancel: TW.Runtime.convertLocalizableString('[[cancel]]') === '???' ? 'Cancel' : TW.Runtime.convertLocalizableString('[[cancel]]')
        };
        gridAdvanced.l8nTokens = l8nTokens;
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

    /**
     * Toggle showing/hiding the pagination container.
     * @param {boolean} show specifying whether to show/hide the pagination container.
     */
    this.togglePaginationContainer = function(show) {
        var paginationId = '#' + gridId + '-pagination';
        if(show) {
            $(paginationId).show();
        } else {
            $(paginationId).hide();
        }
    };

    /**
     * Hide/Show No Data Overlay
     * @param {boolean} show specifying whether to show/hide the No-Data overlay.
     */
    this.toggleNoDataOverlay = function(show){
        if(show) {
            // This has to be set to visibility hidden and not display none to keep the dimensions of the widget
            // Without dimensions, the dhtmlx grid assumes its 0 width and 0 height.
            $('#' + gridId).css('visibility','hidden');
            thisWidget.jqElement.find('.no-data').show();
        } else {
            $('#' + gridId).css('visibility','');
            thisWidget.jqElement.find('.no-data').hide();
        }
    };


    this.widgetContextMenuItems = function(){
        var menuItems = [];
        menuItems.push({
            cmd: 'reload-bindings',
            additionalData: '',
            menuText: TW.IDE.I18NController.translate('tw.grid-advanced-ide.reload-bindings'),
            icon: ''
        });
        return menuItems;
    };

    this.widgetContextMenuCmd = function(cmd) {
        switch(cmd){
            case 'reload-bindings':
                thisWidget.buildGrid();
                break;
        }
    };

    this.beforeDestroy = function () {
        try{
            gridAdvanced.destroy();
        }catch(e){
            TW.log.warn('Failed to destroy gridAdvanced properly');
        }

        gridAdvanced = undefined;
        thisWidget.PaginationSettings = undefined;
    };

    /**
     * Goes through the Data and Configuration bindings on the widget.
     * calls the services associated with them.
     * updates the gridAdvanced object.
     */
    this.updateBoundProperties = function(){
        var bindings = TW.IDE.Workspace.Mashups.Current.findDataBindingsByAreaAndId(this.properties.Area, this.properties.Id);
        bindings.forEach(function(binding){
            if(!binding.PropertyMaps || binding.PropertyMaps.length == 0 || !binding.SourceSection || !binding.SourceId){
                return;
            }
            var dataService = TW.IDE.Workspace.Mashups.Current.findDataServiceByDataAndDataServiceName(binding.SourceSection, binding.SourceId);
            if (dataService) {
                var target = dataService.Target;
                var bindingDef = TW.IDE.Workspace.Mashups.Current.Data[binding.SourceSection];
                switch (binding.PropertyMaps[0].TargetProperty) {
                    case 'Data':
                        thisWidget.getData(bindingDef.EntityType, bindingDef.EntityName, target);
                        break;
                    case 'Configuration':
                        thisWidget.getBoundConfig(bindingDef.EntityType, bindingDef.EntityName, target);
                        break;
                    case 'FooterData':
                        thisWidget.getFooterData(bindingDef.EntityType, bindingDef.EntityName, target);
                        break;
                }
            }
        });
    };

    /**
     * Gets the data bound to the service and updates the grid to display it.
     * @param {string} entityName name of the entity (Thing) containing the service
     * @param {string} serviceName Service name to request data from, will always hit AllData
     */
    this.getData = function(entityType, entityName, serviceName){
        this.runService(entityType, entityName, serviceName, this.serviceHandler.bind(this));
    };

    /**
     * Data Service callback method
     * @param invoker
     */
    this.serviceHandler = function(invoker) {
        if(gridAdvanced){
            if(!this.isPropertyBoundAsTarget('Configuration')) {
                thisWidget.getPropertyConfig();
            }
            gridAdvanced.updateBindable('Data', invoker.result.rows);
            this.positionContainers();
            this.toggleNoDataOverlay(false);
            this.togglePaginationContainer(true);
            setTimeout(function() {
                $('#' + gridId).width('inherit');
            }, 500);
            gridAdvanced.resize();
        }
    };


    /**
     * Gets the data bound to the service and updates the grid to display it.
     * @param {string} entityName name of the entity (Thing) containing the service
     * @param {string} serviceName Service name to request data from, will always hit AllData
     */
    this.getFooterData = function(entityType, entityName, serviceName){
        this.runService(entityType, entityName, serviceName, this.footerServiceHandler.bind(this));
    };

    /**
     * Data Service callback method
     * @param invoker
     */
    this.footerServiceHandler = function(invoker) {
        if(gridAdvanced){
            if(!this.isPropertyBoundAsTarget('Configuration')) {
                thisWidget.getPropertyConfig();
            }
            gridAdvanced.updateBindable('FooterData', invoker.result.rows);
            this.positionContainers();
            this.toggleNoDataOverlay(false);
            this.togglePaginationContainer(true);
            setTimeout(function() {
                $('#' + gridId).width('inherit');
            }, 500);
            gridAdvanced.resize();
        }
    };
    /**
     * Updates the grid config with the properties currently set in the widget
     */
    this.getPropertyConfig = function(){
        var parser = thisWidget.ConfigurationParserFactory.createParser('mashup-builder', thisWidget, TW.getStyleFromStyleDefinition, TW.Runtime.convertLocalizableString, true);
        gridAdvanced.updateBindable('Configuration', parser.configuration);
    };

    /**
     * Gets the configuration that is bound to the widget
     * @param {string} entityName name of the entity (Thing) containing the service
     * @param {string} serviceName Service name to request data from, will always hit AllData
     */
    this.getBoundConfig = function(entityType, entityName, serviceName){
        this.runService(entityType, entityName, serviceName, function(invoker){
            var parser = thisWidget.ConfigurationParserFactory.createParser('dynamic', JSON.parse(invoker.result.rows[0].result),
                undefined, undefined, true);
            gridAdvanced.updateBindable('Configuration', parser.configuration);
        });
    };

    /**
     * Hits a service and calls the callback when done.
     * @param {string} entityName name of the entity (Thing) containing the service
     * @param {string} serviceName Service name to request data from, will always hit AllData
     * @param {function} callback
     */
    this.runService = function(entityType, entityName, serviceName, callback){
        // entityName comes in with more information than we need, strip out only what is needed.
        callback = callback || $.noop();
        var invokeInfo =
        {
            entityType: entityType,
            entityName: entityName,
            characteristic: 'Services',
            target: serviceName,
            apiMethod: RESTAPIConstants.Methods.METHOD_POST,
            parameters: {
                maxItems: 2000
            }
        };
        var serviceInvoker = new ThingworxInvoker(invokeInfo);

        serviceInvoker.invokeService(
            function(invoker) {
                callback(invoker);
            }, function(){
                TW.log.warn('Failed to retrieve grid-advanced service info for entity ' + entityName + ' and service '+ serviceName);
            }, true);
    };
    return this;
};
