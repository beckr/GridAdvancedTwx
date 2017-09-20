gaRequire.define('tw-grid-advanced/grid-advanced-wrapper',['exports', './tw-grid-advanced', './configuration-parser-factory', './tooltip/tooltip-factory', 'lodash-amd'], function (exports, _twGridAdvanced, _configurationParserFactory, _tooltipFactory, _lodashAmd) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GridAdvancedWrapper = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var GridAdvancedWrapper = exports.GridAdvancedWrapper = function GridAdvancedWrapper() {
    _classCallCheck(this, GridAdvancedWrapper);
  };
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/grid-advanced-wrapper.js.map
;gaRequire.define('tw-grid-advanced', ['tw-grid-advanced/grid-advanced-wrapper'], function (main) { return main; });

gaRequire.define('tw-grid-advanced/tw-grid-advanced',['exports', 'lodash-amd', 'jquery', './logger', './selection-handler', './column-sort-handler', './configuration-parser', './tooltip/default-tooltip', './dhtmlx-table-data', './events/register-event', './performance-monitor', './user-setting-handler', './child-grid-handler', './query-handler', '../../components/definitions/style-definition'], function (exports, _lodashAmd, _jquery, _logger, _selectionHandler, _columnSortHandler, _configurationParser, _defaultTooltip, _dhtmlxTableData, _registerEvent, _performanceMonitor, _userSettingHandler, _childGridHandler, _queryHandler, _styleDefinition) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TwGridAdvanced = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _dec, _class;

    var TwGridAdvanced = exports.TwGridAdvanced = (_dec = (0, _registerEvent.RegisterEvent)('onRowDblClicked'), _dec(_class = function () {
        function TwGridAdvanced(gridId, rowSelectionCallBack) {
            var isTreeGrid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            _classCallCheck(this, TwGridAdvanced);

            this._performanceMonitor = new _performanceMonitor.PerformanceMonitor(false);
            this._performanceMonitor.startTime('constructor');
            this._gridId = gridId;
            this._menu = undefined;
            this._rowSelectionCallBack = rowSelectionCallBack;
            this._gridAdvanced = new dhtmlXGridObject(gridId);
            this._defaultStyles = {};
            this._responsiveLayout = false;
            this._tooltip = _defaultTooltip.DefaultTooltip;
            this._columnConfigs = [];
            this._selectionHandler = new _selectionHandler.SelectionHandler(isTreeGrid, this._gridAdvanced, this._dhtmlxTableData, rowSelectionCallBack, this._expandOrRetrieveRows.bind(this));
            this._imagePath = '../Common/thingworx/widgets/gridadvanced/imgs/';
            this._menuIconsPath = '../Common/thingworx/widgets/gridadvanced/common/images/';
            this._structPath = '../Common/thingworx/widgets/gridadvanced/common/';
            this._initResize = true;
            this._resetLocation = 'top-right';
            this._paginationLocation = 'bottom-left';
            this._performanceMonitor.endTime('constructor');
            this._currentPage = 1;
            this._initSplit = false;
            this._currentTableWidth = 0;
            this._expirationDate = new Date();
            this._expirationDate.setFullYear(this._expirationDate.getFullYear() + 1);
            this._maxRowCacheReached = false;
            this._applyDefaultRowSelections = true;
            this._isTreeGrid = isTreeGrid;
            this._hiddenColumns = [];
            this._splitIndex = -1;
            this._l8nTokens = {
                search: 'Search',
                reset: 'Reset',
                results: 'Results',
                records: 'Rows ',
                to: ' - ',
                page: 'Page ',
                perpage: 'rows per page',
                first: 'To first Page',
                previous: 'Previous Page',
                found: 'Found records',
                next: 'Next Page',
                last: 'To last Page',
                of: ' of ',
                notfound: 'No Records Found',
                maxRowsWarning1: 'The maximum grid cache size of ',
                maxRowsWarning2: ' rows has been reached.',
                maxRowsWarning3: 'Please refresh your browser or close some nodes to free up memory.',
                freeMemoryWarning: 'Please wait while we clear the row cache to free up memory, this may take a minute...',
                splitGrid: 'Split Columns',
                unSplitGrid: 'Unsplit Columns'
            };
            this._searchValue = '';
        }

        TwGridAdvanced.prototype._configureTable = function _configureTable() {
            if (this._cfg) {
                try {
                    this._performanceMonitor.startTime('_configureTable');
                    this._gridAdvanced.setImagePath(this._imagePath);
                    this._gridAdvanced.setHeader(this._dhtmlxTableData.headers, null, this._createHeaderStyles());
                   
                    this._gridAdvanced.setColumnIds(this._dhtmlxTableData.columnIds);


                    this._configureLayout();
                    this._gridAdvanced.enableColumnMove(true);
                    this._gridAdvanced.enableColumnAutoSize(true);
                    this._createPaginationControls();
                    this._createSearchControls();
                    this._createResetButton();
                    this._gridAdvanced.setInitWidths(this._createColumnWidths());
                    this._gridAdvanced.setColAlign(this._createColumnAlignments());
                    this._gridAdvanced.setColTypes(this._dhtmlxTableData.createColumnTypes(this._isTreeGrid));
                    this._gridAdvanced.enableContextMenu(this._menu);
                    this._gridAdvanced.enableMultiline(true);
                    this._enableTreeCellEdit(false);
                    this._columnSortHandler.setColumnSortDataTypes(this._dhtmlxTableData.columns);
                    this._gridAdvanced.init();
                    this._gridAdvanced.kidsXmlFile = '-';
                    this._enableSmartRendering(1);
                    this._performanceMonitor.startTime('parse');
                    this._gridAdvanced.parse(this._dhtmlxTableData.data, 'json');
                    this._performanceMonitor.endTime('parse');
                    this._orderColumns();
                    this._setupRowSelectionBindings();
                    this._columnSortHandler.setColumnSort();
                    this._expandLoadedRows();
                    this._readColumnSettingPersistence();

                    this._enableColumnSettingPersistence();
                    this._formatRowsInView();

                    this._generatePaginationAndSearchControls();
                    this._attachEvents();
                    this._toggleDefaultTooltips();
                    this._initTableSizing();
                    this._adjustHorizontalOffset();
                    this._resizePaginationControls();
                    this._adjustSpacing();
                    this._selectionHandler.refreshSelections();
                    this._selectedRows = this._selectionHandler.selectedRows;
                    this._setDefaultRowSelections();
                    this._resetSearch();

                    var self = this;

					if(this._cfg.enableTextFiltering) {
						var filterType = this._cfg.textFilteringType;
                        this._gridAdvanced.attachHeader(this._dhtmlxTableData.headers.split(',').map(function () { return '#' + filterType; }).join(','));
						var gridInstance = this._gridAdvanced;
						this._dhtmlxTableData._columns.forEach(function(column, i) {	
							gridInstance.filterByAll = function() {
								var d = [];
								var c = [];
								var h;
								this._build_m_order();
								for (var e = 0; e < this.filters.length; e++) {
									//var g = this._m_order ? this._m_order[this.filters[e][1]] : this.filters[e][1];
									var g = this.filters[e][1];
									if (g >= this._cCount || this.filters[e][0].old_value == this.filters[e][0].value) {
										continue
									}
									c.push(g);
									if (this.filters[e][0]._filter) {
										h = this.filters[e][0]._filter()
									}
									var f;
									if (typeof h != "function" && (f = (this.combos[g] || ((this._col_combos && this._col_combos[g]) ? this._col_combos[g] : ((this._sub_trees && this._sub_trees[g]) ? this._sub_trees[g][1] : false))))) {
										if (f.values) {
											g = f.values._dhx_find(h);
											h = (g == -1) ? h : f.keys[g]
										} else {
											if (f.getOptionByLabel) {
												h = (f.getOptionByLabel(h) ? f.getOptionByLabel(h).value : h)
											} else {
												h = f[h]
											}
										}
									}
									d.push(h)
								}
								if (!this.callEvent("onFilterStart", [c, d])) {
									return
								}
								this.filterBy(c, d);
								if (this._cssEven) {
									this._fixAlterCss()
								}
								this.callEvent("onFilterEnd", [this.filters]);
								if (this._f_rowsBuffer && this.rowsBuffer.length == this._f_rowsBuffer.length) {
									this._f_rowsBuffer = null
								}
							}
							gridInstance.getFilterElement(i)._filter = function () {
								if(this.old_value == this.value) {
									return function() {return true};
								}
								 var input = this.value; // gets the text of the filter input and we transform it into regex
								 var inputEscaped = input.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&"); // escape the regex text in the input other that start wildcard
								 var inputRegex = new RegExp("^" + this.value.replace(/\*/gi, "(.*)") + "(.*)", 'i');
                                 var currentRow = i;
                                 var isScheduled = false;

                                 if (!isScheduled) {
                                    isScheduled = true;
                                    window.setTimeout(function () {
                                        self._widget.setProperty('NumberOfVisibleRows', self._gridAdvanced.getRowsNum());
                                        isScheduled = false;
                                    }, 0);
                                }

								  return function(value, id){
                                        // checks if the value of a cell has the text from the filter 
                                        
                                       

										if (value.toString().match(inputRegex)){ 
											return true;
										} else {
											return false; 
										}
								}
							}
						});
                    }
                    this._performanceMonitor.endTime('_configureTable');
                } catch (e) {
                    _logger.Logger.error('DHTMLX Grid loading error: ' + e.stack);
                }
            }
        };

        TwGridAdvanced.prototype.enableUserConfiguration = function enableUserConfiguration(username, version, cookiePersistenceEnabled) {
            this._userSettingHandler = new _userSettingHandler.UserSettingHandler(cookiePersistenceEnabled, username, version, this._gridId);
        };

        TwGridAdvanced.prototype.enableResponsiveLayout = function enableResponsiveLayout() {
            this._responsiveLayout = true;
        };

        TwGridAdvanced.prototype.updateBindable = function updateBindable(property, value) {
            switch (property) {
                case 'Data':
                    this._updateData = true;
                    this._updatedData = value;
                    break;
                case 'SelectedRows':
                    this._updatedSelectedRows = value;
                    break;
                case 'ExpandRows':
                    this._updatedExpandRows = value;
                    break;
                case 'DefaultSelectedRows':
                    this._updatedDefaultSelectedRows = value;
                    break;
                case 'Configuration':
                    this._updatedCfg = value;
                    break;
                case 'QueryFilter':
                    this._updateQueryData = true;
                    this._updatedQueryFilter = value;
                    break;
                default:
                    break;
            }
            this.refresh();
        };

        TwGridAdvanced.prototype.refresh = function refresh() {
            this._performanceMonitor.startTime('refresh');
            this._currentPage = 1;
            if (this._updatedCfg) {
                this._cfg = this._updatedCfg;

                this._cfg.paginationSettings.enabled = this._mockMode ? this._cfg.paginationSettings.enabled : false;
                this._updatedCfg = undefined;
                this._updateData = this._updatedData !== undefined;
                this._updateStyles();
                this._resetColumnSort();
                this._queryData();
            }
            if (this._cfg) {
                if (this._updateData || this._updatedSplitIndex) {
                    this._dhtmlxTableData = new _dhtmlxTableData.DhtmlxTableData(this._updatedData, this._cfg, this.localizationUtil);
                    this._updateData = !this._updateData;
                    this._updatedSplitIndex = this._updatedSplitIndex ? undefined : this._updatedSplitIndex;

                    this.destroy();
                    this._gridAdvanced = new dhtmlXGridObject(this._gridId);
                    this._selectionHandler.gridAdvanced = this._gridAdvanced;
                    this._selectionHandler.dhtmlxTableData = this._dhtmlxTableData;
                    if (this._cfg.rowDefinition) {
                        this._selectionHandler.autoScroll = this._cfg.rowDefinition.autoScroll;
                    }
                    this._resetColumnSort();
                    this._configureTable();
                }
                if (this._dhtmlxTableData) {
                    if (this._updatedSelectedRows) {
                        if (this._isTreeGrid) {
                            this._selectedRows = this._updatedSelectedRows;
                        } else {
                            this._selectedRows = this._generateRowSelectionsFromInfoTable(this._updatedSelectedRows);
                        }
                        this._updatedSelectedRows = undefined;
                    }
                    this._setDefaultRowSelections();
                    if (this._updatedExpandRows) {
                        this._expandLoadedRows(false);
                    }
                    if (this._cfg.rowDefinition && this._updatedDefaultSelectedRows) {
                        this._cfg.rowDefinition.defaultSelectedRows = _configurationParser.ConfigurationParser.convertDefaultSelectedRows(this._updatedDefaultSelectedRows);
                        this._updatedDefaultSelectedRows = undefined;
                        this._selectedRows = [];
                        this._setDefaultRowSelections();
                    }
                    if (this._updateQueryData && this._updatedQueryFilter) {
                        this._queryData();
                        this._updateQueryData = false;
                    }
                }
            }
            this._applyDefaultRowSelections = true;
            this._performanceMonitor.endTime('refresh');
        };

        TwGridAdvanced.prototype.destroy = function destroy() {
            this._maxRowCacheReached = false;
            this._childGridHandler = undefined;

            if (this._gridAdvanced) {
                this._gridAdvanced.destructor();
                this._gridAdvanced = undefined;
            }
            if (this._searchToolbarElement) {
                this._searchToolbarElement.remove();
                this._searchToolbarElement = undefined;
            }
            if (this._resetToolbarElement) {
                this._resetToolbarElement.remove();
                this._resetToolbarElement = undefined;
            }
            if (this._pagingToolbarElement) {
                this._pagingToolbarElement.remove();
                this._pagingToolbarElement = undefined;
            }
            if (this._selectionHandler) {
                this._selectionHandler.removeBindings();
            }
        };

        TwGridAdvanced.prototype._initMenu = function _initMenu() {
            this._menu = new dhtmlXMenuObject();
            this._menu.renderAsContextMenu();
            this._menu.setIconsPath(this._menuIconsPath);
            if (this._initSplit) {
                this._menu.loadStruct(this._structPath + '_context_unsplit.xml');
            } else {
                this._menu.loadStruct(this._structPath + '_context_split.xml');
            }
        };

        TwGridAdvanced.prototype._enableTreeCellEdit = function _enableTreeCellEdit() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            if (this._isTreeGrid) {
                this._gridAdvanced.enableTreeCellEdit(enabled);
            }
        };

        TwGridAdvanced.prototype._configureLayout = function _configureLayout() {
            this._gridAdvanced.enableRowsHover(true, 'grid_hover');
            var entBox = (0, _jquery2.default)(this._gridAdvanced.entBox);
            var parentContainer = entBox.closest('.widget-gridadvanced');
            if (this._responsiveLayout) {
                this._gridAdvanced.enableAutoWidth(false);
                this._gridAdvanced.enableAutoHeight(false);
                this._updateGridContainer();
                parentContainer.css('overflow', 'hidden');
            } else {
                var containerHeight = parentContainer.height();
                var containerWidth = parentContainer.width();
                entBox.css('height', containerHeight);
                entBox.css('width', containerWidth);
            }
        };

        TwGridAdvanced.prototype.resize = function resize() {
            this._resizeColumns(-1);

            if (this._splitIndex > 0) {
                this._resizeSplitColumns();
            } else {
                this._updateGridContainer();
            }
            if (this._cfg && this._cfg.rowDefinition && this._cfg.rowDefinition.autoScroll) {
                this._selectionHandler.autoScrollToLastSelected();
            }

            if (!this._initResize) {
                this._saveColumnWidthToCookie();
            }
        };

        TwGridAdvanced.prototype._updateGridContainer = function _updateGridContainer() {
            var entBox = (0, _jquery2.default)(this._gridAdvanced.entBox);
            var gridContainer = (0, _jquery2.default)('#' + this._gridId);
            var containerWidth = this._getContainerWidth();
            var containerHeight = this._getContainerHeight();
            gridContainer.width(containerWidth);
            gridContainer.height(containerHeight);
            entBox.width(containerWidth);
            entBox.height(containerHeight);
            entBox.find('.objbox').width(containerWidth);
        };

        TwGridAdvanced.prototype._getContainerHeight = function _getContainerHeight() {
            return (0, _jquery2.default)(this._gridAdvanced.entBox).parent().height();
        };

        TwGridAdvanced.prototype._getContainerWidth = function _getContainerWidth() {
            var width = 0;
            if (this._splitIndex > 0) {
                width = (0, _jquery2.default)(this._gridAdvanced.entBox).parent().parent().width();
            } else {
                width = (0, _jquery2.default)(this._gridAdvanced.entBox).parent().width();
            }
            return width;
        };

        TwGridAdvanced.prototype._getTableWidth = function _getTableWidth() {
            var tableWidth = 0;
            (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.objbox').each(function (index, tableElem) {
                tableWidth += (0, _jquery2.default)(tableElem).children('table').width();
            });
            return tableWidth;
        };

        TwGridAdvanced.prototype._includeScrollOffset = function _includeScrollOffset() {
            var scrollBars = false;
            var parentContainer = (0, _jquery2.default)(this._gridAdvanced.entBox);
            var tableElement = (0, _jquery2.default)(this._gridAdvanced.objBox).children('table');
            var headerElement = (0, _jquery2.default)(this._gridAdvanced.hdrBox).children('table');
            if (parentContainer && tableElement && headerElement) {
                scrollBars = tableElement.outerHeight() >= parseInt(parentContainer.height(), 10) - headerElement.height();
            }
            return scrollBars;
        };

        TwGridAdvanced.prototype._getScrollWidth = function _getScrollWidth() {
            (0, _jquery2.default)(document.body).append('<div id="outerScrollElem"></div>');
            (0, _jquery2.default)('#outerScrollElem').css('visibility', 'hidden');
            (0, _jquery2.default)('#outerScrollElem').width(100);
            var outerElem = document.getElementById('outerScrollElem');
            var outerDivWidth = outerElem.offsetWidth;

            (0, _jquery2.default)('#outerScrollElem').css('overflow', 'scroll');
            (0, _jquery2.default)('#outerScrollElem').append('<div id="innerScrollElem"></div>');
            (0, _jquery2.default)('#innerScrollElem').width('100%');
            var innerElem = document.getElementById('innerScrollElem');
            var innerDivWidth = innerElem.offsetWidth;

            (0, _jquery2.default)('#outerScrollElem').remove();

            return outerDivWidth - innerDivWidth;
        };

        TwGridAdvanced.prototype._initTableSizing = function _initTableSizing() {
            this._performanceMonitor.startTime('initTableSizing');
            if (this._initResize) {
                this._resizeColumns(-1);
                this._initResize = false;
            }
            this._performanceMonitor.endTime('initTableSizing');
        };

        TwGridAdvanced.prototype._resizeColumns = function _resizeColumns(index, isHidden) {
            var _this = this;

            this._performanceMonitor.startTime('resizeColumns');
            this._updateCurrentTableWidth();
            var containerWidth = this._getContainerWidth();
            var usedWidth = this._currentTableWidth > 0 ? this._currentTableWidth : this._getTableWidth();
            var scrollOffset = this._includeScrollOffset();
            var scrollWidth = this._getScrollWidth();
            var availableWidth = containerWidth - usedWidth;
            if (scrollOffset) {
                availableWidth -= scrollWidth;
            }
            var originalAvailableWidth = availableWidth;
            var columnId = this._gridAdvanced.getColumnId(index);
            var totalPercentage = this._columnConfigs.reduce(function (percent, col) {
                var colIndex = _this._gridAdvanced.getColIndexById(col.id);
                var colWidth = _this._gridAdvanced.getColWidth(colIndex);
                if (isNaN(colWidth)) {
                    colWidth = (0, _jquery2.default)(_this._gridAdvanced.hdrBox).find('th').eq(colIndex).outerWidth();
                }
                if (colWidth > 0) {
                    percent += col.width.indexOf('%') > -1 ? parseInt(col.width, 10) : 0;
                }
                return percent;
            }, 0);
            if (this._columnConfigs) {
                (function () {
                    (0, _jquery2.default)(_this._gridAdvanced.objBox).css('overflow', 'hidden');
                    var adjustAutoCols = [];
                    _this._columnConfigs.forEach(function (col) {
                        if (columnId !== col.id || !isHidden) {
                            var colIndex = _this._gridAdvanced.getColIndexById(col.id);
                            var colWidth = _this._gridAdvanced.getColWidth(colIndex);
                            if (isNaN(colWidth)) {
                                colWidth = (0, _jquery2.default)(_this._gridAdvanced.hdrBox).find('th').eq(colIndex).outerWidth();
                            }
                            var isVisible = colWidth > 0;
                            if (isVisible && _lodashAmd2.default.isNumber(colWidth)) {
                                if (col.width.indexOf('%') > -1) {
                                    var adjustedWidth = 0;
                                    var percent = parseInt(col.width, 10);
                                    var widthFactor = percent / totalPercentage;
                                    adjustedWidth += originalAvailableWidth * widthFactor;
                                    var newWidth = adjustedWidth + colWidth;
                                    if (newWidth < 50) {
                                        newWidth = 50;
                                        adjustedWidth = newWidth - colWidth;
                                    }
                                    _this._gridAdvanced.setColWidth(colIndex, newWidth);
                                    availableWidth -= adjustedWidth;
                                } else if (col.width === '*' && colIndex > _this._splitIndex) {
                                    adjustAutoCols.push(colIndex);
                                }
                            }
                        }
                    });

                    _this._updateAutoWidthColumns(adjustAutoCols, availableWidth);

                    setTimeout(function (gridAdvanced) {
                        if (gridAdvanced) {
                            (0, _jquery2.default)(gridAdvanced.objBox).css('overflow', 'auto');
                        }
                    }, 1, _this._gridAdvanced);
                })();
            }
            (0, _jquery2.default)(this._gridAdvanced.entBox).children('.xhdr').css('height', 'auto');
            this._adjustHorizontalOffset();
            this._updateCurrentTableWidth();
            this._updateSplitTableWidth();
            this._performanceMonitor.endTime('resizeColumns');
        };

        TwGridAdvanced.prototype._updateAutoWidthColumns = function _updateAutoWidthColumns(adjustCols, availableWidth) {
            var _this2 = this;

            var numCols = adjustCols.length;
            var adjustWidth = availableWidth;
            adjustCols.forEach(function (ind) {
                var width = _this2._gridAdvanced.getColWidth(ind);
                if (isNaN(width)) {
                    width = (0, _jquery2.default)(_this2._gridAdvanced.cells2(0, ind).cell).outerWidth();
                }
                adjustWidth += width;
            });
            adjustCols.forEach(function (ind) {
                var newColWidth = adjustWidth / numCols;
                newColWidth = newColWidth > 50 ? newColWidth : 50;
                _this2._gridAdvanced.setColWidth(ind, newColWidth);
            });
        };

        TwGridAdvanced.prototype._updateCurrentTableWidth = function _updateCurrentTableWidth() {
            this._currentTableWidth = 0;
            for (var i = 0; i < this._gridAdvanced.getColumnsNum(); i++) {
                if (!isNaN(this._gridAdvanced.getColWidth(i))) {
                    this._currentTableWidth += this._gridAdvanced.getColWidth(i);
                } else {
                    this._currentTableWidth += (0, _jquery2.default)(this._gridAdvanced.hdrBox).find('th').eq(i).outerWidth();
                }
            }
        };

        TwGridAdvanced.prototype._updateSplitTableWidth = function _updateSplitTableWidth() {
            if (this._splitIndex > -1) {
                this._splitTableWidth = 0;
                this._mainTableWidth = 0;
                for (var i = 0; i < this._gridAdvanced.getColumnsNum(); i++) {
                    if (i < this._splitIndex) {
                        this._splitTableWidth += this._gridAdvanced.getColWidth(i);
                    } else {
                        this._mainTableWidth += this._gridAdvanced.getColWidth(i);
                    }
                }

                var splitTables = (0, _jquery2.default)('#' + this._gridId).children('div');
                if (splitTables.length === 2) {
                    (0, _jquery2.default)(splitTables[0]).width(this._splitTableWidth);
                    (0, _jquery2.default)(splitTables[0]).children('.objbox').width(this._splitTableWidth - 1);
                    (0, _jquery2.default)(splitTables[1]).css('left', this._splitTableWidth);
                }
            }
        };

        TwGridAdvanced.prototype._adjustSpacing = function _adjustSpacing() {
            if (this._splitIndex > -1) {
                var splitTable = (0, _jquery2.default)('#' + this._gridId + ' [id^=cgrid2]');
                splitTable.width(splitTable.width() - 1);
            }
        };

        TwGridAdvanced.prototype._getColumnResizeList = function _getColumnResizeList() {
            var columnResizeList = '';
            if (this._gridAdvanced && this._gridAdvanced.columnIds) {
                for (var i = 0; i < this._gridAdvanced.columnIds.length; i++) {
                    columnResizeList += 'true';
                    if (i < this._gridAdvanced.columnIds.length - 1) {
                        columnResizeList += ',';
                    }
                }
            }
            return columnResizeList;
        };

        TwGridAdvanced.prototype._resizeSplitColumns = function _resizeSplitColumns() {
            var containerWidth = this._getContainerWidth();
            var containerHeight = this._getContainerHeight();
            var splitLeftTable = (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.objbox')[0];
            var leftTableWidth = (0, _jquery2.default)(splitLeftTable).find('table').width();
            var headerHeight = (0, _jquery2.default)(this._gridAdvanced.entBox).find('.xhdr').height();
            var responsiveOffset = 0;
            var leftTableOffset = containerWidth - leftTableWidth + responsiveOffset;
            var headerOffset = containerHeight - headerHeight - responsiveOffset;
            var idSelector = '#' + this._gridId;
            var styleRules = '';
            var heightStyle = '';
            if (this._responsiveLayout) {
                heightStyle = ' height: ' + headerOffset + 'px !important; ';
            }
            styleRules = idSelector + ' { width: ' + containerWidth + 'px !important; height}';
            styleRules += idSelector + ' .split_left { left: 0px !important; width: ' + leftTableWidth + 'px !important; height: 100% !important; }';
            styleRules += idSelector + ' .split_right { left: ' + (leftTableWidth + 1) + 'px !important; width: ' + leftTableOffset + 'px !important; height: 100% !important; }';
            styleRules += idSelector + ' .split_left .objbox { width: ' + leftTableWidth + 'px !important; ' + heightStyle + '}';
            styleRules += idSelector + ' .split_right .objbox { width: ' + leftTableOffset + 'px !important; ' + heightStyle + '}';

            (0, _jquery2.default)(idSelector).children('style').remove();
            var styleBlock = '<style>' + styleRules + '</style>';
            (0, _jquery2.default)(idSelector).prepend(styleBlock);
        };

        TwGridAdvanced.prototype._updateStyles = function _updateStyles() {
            var _this3 = this;

            this._performanceMonitor.startTime('updateStyles');
            var styleRules = '';
            var idSelector = '#' + this._gridId;

            (0, _jquery2.default)(this._gridAdvanced.entBox).siblings('style').remove();
            var styleMap = new Map();
            _lodashAmd2.default.forEach(this._cfg.styleDefinitions, function (styleDef) {
                styleMap.set(styleDef.displayName, styleDef);
            });
            _lodashAmd2.default.forEach(this._cfg.orderedStyleNames, function (styleName) {
                var styleDef = styleMap.get(styleName);
                if (styleDef) {
                    var backgroundStyle = styleDef.getBackgroundStyle();
                    var borderStyle = styleDef.getBorderStyle();
                    var fontStyle = styleDef.getFontStyle();
                    switch (styleDef.displayName) {
                        case _this3._cfg.TABLE_WRAPPER_STYLE:
                            styleRules += idSelector + ' {' + backgroundStyle + borderStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr td {' + fontStyle + '}';
                            break;
                        case _this3._cfg.TABLE_HEADER_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td{' + backgroundStyle + borderStyle + fontStyle + ' border-left-style: none;}';
                            styleRules += idSelector + ' .xhdr {' + backgroundStyle + '}';
                            break;
                        case _this3._cfg.TABLE_FOCUS_STYLE:
                            styleRules += idSelector + ':focus {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.ROW_BORDER_STYLE:
                            var minRowHeightStyle = '';
                            if (_this3._cfg.rowDefinition) {
                                minRowHeightStyle = 'height:' + _this3._cfg.rowDefinition.minRowHeight + 'px;';
                            }
                            borderStyle = 'border-top-color: ' + styleDef.borderColor + '; border-top-width: ' + styleDef.borderWidth + '; border-top-style: ' + styleDef.borderStyle + ';';
                            styleRules += idSelector + ' .objbox table tbody tr { ' + borderStyle + minRowHeightStyle + '}';
                            break;
                        case _this3._cfg.CELL_BORDER_STYLE:
                            styleRules += idSelector + ' .objbox table tbody tr td {' + borderStyle + ' border-bottom-style: none; border-left-style: none; height:inherit; }';
                            break;
                        case _this3._cfg.ROW_BACKGROUND_STYLE:
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material td {' + backgroundStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.ROW_ALTERNATE_BACKGROUND_STYLE:
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material td {' + backgroundStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.ROW_HOVER_STYLE:
                            backgroundStyle = styleDef.getBackgroundStyle(true);
                            borderStyle = styleDef.getBorderStyle(true);
                            fontStyle = styleDef.getFontStyle(true);
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material td.grid_hover {' + backgroundStyle + borderStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material td.grid_hover {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.ROW_SELECTED_STYLE:
                            backgroundStyle = styleDef.getBackgroundStyle(true);
                            borderStyle = styleDef.getBorderStyle(true);
                            fontStyle = styleDef.getFontStyle(true);
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material.rowselected td[style] {' + borderStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material.rowselected td[style] {' + borderStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material.rowselected td {' + backgroundStyle + borderStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material.rowselected td {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.PAGINATION_BUTTON_STYLE:
                            styleRules += idSelector + '-paging-container .dhx_toolbar_btn {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.PAGINATION_SELECTED_STYLE:
                            styleRules += idSelector + '-paging-container .dhx_toolbar_btn[pageinfo="selected"]{' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.PAGINATION_HOVER_STYLE:
                            styleRules += idSelector + '-paging-container .dhxtoolbar_btn_over {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.TOOLTIP_STYLE:
                            styleRules += '#tiptip_holder.' + _this3._gridId + ' #tiptip_content {' + backgroundStyle + borderStyle + fontStyle + '}';
                            var tiptipArrowStyle = '';
                            borderStyle.split(';').forEach(function (element) {
                                if (element.indexOf('border-color') === 0) {
                                    tiptipArrowStyle = element.replace('border-color', 'border-bottom-color');
                                }
                            });
                            styleRules += 'body #tiptip_holder.tip_bottom.' + _this3._gridId + ' #tiptip_arrow_inner {' + tiptipArrowStyle + '}';
                            break;
                        case _this3._cfg.TOOLBAR_STYLE:
                            styleRules += idSelector + '-bottom-container {' + backgroundStyle + borderStyle + fontStyle + '}';
                            styleRules += idSelector + '-top-container {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this3._cfg.SORT_ASCENDING_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td.dhxgrid_sort_asc_col {' + ' background-image: url(' + styleDef.image + ');' + ' background-position: 2px 6px;' + ' background-repeat: no-repeat;' + ' background-size: 10px 10px;' + '}';
                            break;
                        case _this3._cfg.SORT_DESCENDING_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td.dhxgrid_sort_desc_col {' + ' background-image: url(' + styleDef.image + ');' + ' background-position: 2px 15px;' + ' background-repeat: no-repeat;' + ' background-size: 10px 10px;' + '}';
                            break;
                    }
                }
            });
            styleRules += idSelector + '-paging-container .dhx_toolbar_text { width: auto !important; }';
            styleRules += idSelector + ' table.obj tr td { padding-top: 0px; padding-bottom: 0px; }';
            if (this._splitIndex && this._splitIndex > -1) {
                styleRules += idSelector + ' .objbox { overflow-x: scroll !important; }';
            }
            var styleBlock = '<style>' + styleRules + '</style>';
            (0, _jquery2.default)(idSelector).parent().prepend(styleBlock);
            (0, _jquery2.default)(idSelector).attr('tabindex', '-1');
            this._performanceMonitor.endTime('updateStyles');
        };

        TwGridAdvanced.prototype._formatColumns = function _formatColumns(columns, gridRow) {
            var _this4 = this;

            if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDefinition, columnIndex) {
                    var styles = gridRow && gridRow.style ? gridRow.style : '';
                    if (columnDefinition && columnDefinition.inLayout && columnDefinition.columnFormatter) {
                        (function () {
                            var stateDefinition = columnDefinition.columnFormatter.stateDefinition;
                            if (stateDefinition && stateDefinition.fieldName) {
                                var stateValueColumnIndex = _lodashAmd2.default.findIndex(columns, function (column) {
                                    return column === stateDefinition.fieldName;
                                });
                                if (stateValueColumnIndex) {
                                    var value = gridRow.rawData[stateValueColumnIndex];
                                    styles = _styleDefinition.StyleDefinition.cascadeCellStyles(gridRow.style, columnDefinition.columnFormatter.getColumnStyles(value));
                                } else {
                                    _logger.Logger.warn('Could not format column "' + columnDefinition.fieldName + '" using state definition "' + stateDefinition.name + '". No column found with state definition field name "' + stateDefinition.fieldName + '"');
                                }
                            } else if (stateDefinition && stateDefinition.type === 'fixed') {
                                var _value = gridRow.rawData[columnIndex];
                                styles = _styleDefinition.StyleDefinition.cascadeCellStyles(gridRow.style, columnDefinition.columnFormatter.getColumnStyles(_value));
                                _this4._gridAdvanced.setCellTextStyle(gridRow.id, columnDefinition.columnIndex, styles);
                            }
                        })();
                    }
                    if (columnDefinition && columnDefinition.inLayout) {
                        styles += _this4._createCellTextWrapStyle(columnDefinition.overflow);
                        _this4._gridAdvanced.setCellTextStyle(gridRow.id, columnDefinition.columnIndex, styles);
                    }
                });
            }
        };

        TwGridAdvanced.prototype._createHeaderStyles = function _createHeaderStyles() {
            var _this5 = this;

            this._performanceMonitor.startTime('createHeaderStyles');
            var headerStyles = [];
            if (this._dhtmlxTableData.columns) {
                this._dhtmlxTableData.columns.forEach(function (column) {
                    if (_this5._cfg.headerDefinition) {
                        var styles = _this5._createCellTextWrapStyle(_this5._cfg.headerDefinition.overflow);
                        if (_this5._cfg.headerDefinition.alignHeader || _this5._cfg.columnDefinitions[0].headerTextAlignment) {
                            var colAlign = _this5._getColumnAlignment(column);
                            styles += 'text-align:' + (colAlign || 'left') + ';';
                        }
                        styles += 'max-height:' + _this5._cfg.headerDefinition.maxHeight + 'px;overflow-y:auto;';
                        if (styles) {
                            headerStyles.push(styles);
                        }
                    }
                });
            }
            this._performanceMonitor.endTime('createHeaderStyles');
            return headerStyles;
        };

        TwGridAdvanced.prototype._getColumnAlignment = function _getColumnAlignment(columnName) {
            var alignment = 'left';
            for (var i = 0; i < this._cfg.columnDefinitions.length; i++) {
                var column = this._cfg.columnDefinitions[i];
                if (column.fieldName === columnName) {
                    alignment = column.textAlignment;
                    if (column.headerTextAlignment) {
                        alignment = column.headerTextAlignment;
                    }
                    break;
                }
            }
            return alignment;
        };

        TwGridAdvanced.prototype._rowFormatterFormatRow = function _rowFormatterFormatRow(columns, gridRow) {
            var _this6 = this;

            if (this._cfg && this._cfg.rowFormatter) {
                if (this._cfg.rowFormatter.stateDefinition && this._cfg.rowFormatter.stateDefinition.type !== 'fixed' && columns) {
                    columns.forEach(function (column, index) {
                        if (column === _this6._cfg.rowFormatter.stateDefinition.fieldName) {
                            _this6._cfg.rowFormatter.format(gridRow, gridRow.rawData[index]);
                            return;
                        }
                    });
                } else {
                    this._cfg.rowFormatter.format(gridRow);
                }
            }
        };

        TwGridAdvanced.prototype._setRowSize = function _setRowSize(gridRow) {
            if (this._cfg && this._cfg.rowDefinition) {
                var cell = this._gridAdvanced.cells(gridRow.id, 0);
                if (cell) {
                    var rowCell = this._gridAdvanced.cells(gridRow.id, 0).cell;
                    if (this._cfg.rowDefinition.minRowHeight > 0) {
                        (0, _jquery2.default)(rowCell).parent().height(this._cfg.rowDefinition.minRowHeight);
                        if (this._splitIndex > -1) {
                            var splitRowCell = this._gridAdvanced.cells(gridRow.id, this._splitIndex).cell;
                            (0, _jquery2.default)(splitRowCell).parent().height(this._cfg.rowDefinition.minRowHeight);
                        }
                    }
                }
            }
        };

        TwGridAdvanced.prototype._createCellTextWrapStyle = function _createCellTextWrapStyle(overflow) {
            var style = '';
            switch (overflow) {
                case 'fitted':
                    style += 'word-wrap:break-word;';
                    break;
                case 'wrapped':
                    style += 'white-space:normal;';
                    style += 'word-wrap:normal;';
                    style += 'overflow:hidden;';
                    style += 'line-height:20px;';
                    break;
                case 'clipped':
                    style += 'overflow:hidden;';
                    style += 'text-overflow:clip;';
                    style += 'white-space:nowrap;';
                    break;
                case 'tooltip':
                case 'ellipsis':
                    style += 'overflow:hidden;';
                    style += 'text-overflow:ellipsis;';
                    style += 'white-space:nowrap;';
                    break;
                default:
                    break;
            }
            return style;
        };

        TwGridAdvanced.prototype._convertRowDataValues = function _convertRowDataValues(keys, gridRow) {
            var _this7 = this;

            gridRow.rawData.forEach(function (value, index) {
                var columnDef = _this7._cfg.findColumnDefinition(keys[index]);
                if (columnDef.inLayout) {
                    var columnIndex = _this7._gridAdvanced.getColIndexById(columnDef.fieldName);
                    var stateValueColumnIndex = _this7._findStateValueColumnIndex(keys, columnDef);
                    var stateValue = stateValueColumnIndex > -1 ? gridRow.rawData[stateValueColumnIndex] : value;
                    _this7._gridAdvanced.cells(gridRow.id, columnIndex).setValue(columnDef.render(value, stateValue));
                }
            });
        };

        TwGridAdvanced.prototype._findStateValueColumnIndex = function _findStateValueColumnIndex(keys, columnDefinition) {
            var stateValueColumnIndex = -1;
            if (columnDefinition && columnDefinition.columnFormatter) {
                (function () {
                    var stateDefinition = columnDefinition.columnFormatter.stateDefinition;
                    if (stateDefinition && stateDefinition.fieldName) {
                        stateValueColumnIndex = _lodashAmd2.default.findIndex(keys, function (column) {
                            return column === stateDefinition.fieldName;
                        });
                    }
                })();
            }
            return stateValueColumnIndex;
        };

        TwGridAdvanced.prototype._setDefaultRowSelections = function _setDefaultRowSelections() {
            var selectionMethod = this._isTreeGrid ? 'setSelectionsById' : 'setSelections';
            this._performanceMonitor.startTime('setupDefaultRowSelections');
            if (this._dhtmlxTableData && this._dhtmlxTableData.data.rows.length > 0 && this._cfg.rowDefinition && this._cfg.rowDefinition.selection) {
                var selection = this._cfg.rowDefinition.selection.toLowerCase();
                if (selection !== 'none') {
                    var defaultSelectedRows = this._cfg.rowDefinition.defaultSelectedRows;
                    if (selection === 'single') {
                        if (this._selectedRows && this._selectedRows.length === 1) {
                            this._selectionHandler[selectionMethod](this._selectedRows);
                        } else if (this._selectedRows && this._selectedRows.length > 1) {
                            _logger.Logger.warn('Found multiple matching rows but can only show one based on RowSelection setting of "' + selection + '"');
                            this._selectionHandler[selectionMethod](_lodashAmd2.default.slice(this._selectedRows, 0, 1));
                        } else if (this._applyDefaultRowSelections && defaultSelectedRows.length === 1) {
                            this._selectionHandler.setSelections(defaultSelectedRows);
                        } else if (this._applyDefaultRowSelections && defaultSelectedRows.length > 1) {
                            _logger.Logger.warn('The DefaultSelectedRows setting "' + defaultSelectedRows + '" is invalid for the RowSelection setting of "' + selection + '"');
                        }
                    } else if (this._selectedRows && this._selectedRows.length >= 1) {
                        this._selectionHandler[selectionMethod](this._selectedRows);
                    } else if (this._applyDefaultRowSelections) {
                        this._selectionHandler.setSelections(defaultSelectedRows);
                    }
                }
            }
            this._performanceMonitor.endTime('setupDefaultRowSelections');
        };

        TwGridAdvanced.prototype._drawCallback = function _drawCallback() {
            this.resize(this._parent.width(), this._parent.height(), false);
        };

        TwGridAdvanced.prototype._generateRowSelectionsFromInfoTable = function _generateRowSelectionsFromInfoTable(selectedRows) {
            var _this8 = this;

            var selections = [];
            if (this._dhtmlxTableData) {
                selectedRows.forEach(function (sRow) {
                    var sId = sRow[_this8._cfg.idFieldName];
                    _this8._dhtmlxTableData.data.rows.forEach(function (tRow, index) {
                        if (sId == tRow.id) {
                            selections.push(index);
                        }
                    });
                });
            }
            return selections;
        };

        TwGridAdvanced.prototype._orderColumns = function _orderColumns(cookieConfig) {
            var _this9 = this;

            this._performanceMonitor.startTime('orderColumns');
            this._ignoreColumnMoveEvents = true;
            if (cookieConfig) {
                cookieConfig.columnOrder.forEach(function (columnIndex, currentIndex) {
                    var columnId = _this9._dhtmlxTableData.columns[columnIndex];
                    var currentLocation = _this9._gridAdvanced.getColIndexById(columnId);
                    if (currentIndex !== currentLocation) {
                        _this9._gridAdvanced.moveColumn(currentLocation, currentIndex);
                    }
                });
            } else if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDef) {
                    if (columnDef.inLayout) {
                        var currentIndex = _this9._gridAdvanced.getColIndexById(columnDef.fieldName);
                        if (currentIndex >= 0) {
                            if (currentIndex !== columnDef.columnIndex) {
                                _this9._gridAdvanced.moveColumn(currentIndex, columnDef.columnIndex);
                            }
                        }
                    }
                });
            }
            this._ignoreColumnMoveEvents = false;
            this._performanceMonitor.endTime('orderColumns');
        };

        TwGridAdvanced.prototype._createColumnWidths = function _createColumnWidths() {
            var _this10 = this;

            var widths = '';
            var totalSetWidth = 0;
            var availableWidth = (0, _jquery2.default)('#' + this._gridId).parent().width();
            this._columnConfigs = [];
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this10._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this10._cfg.findColumnDefinition(columnId);
                        if (columnDef) {
                            var width = columnDef.autoWidth ? '*' : columnDef.width;
                            _this10._columnConfigs.push({ id: columnId, width: width });
                            if (width.indexOf('%') > -1) {
                                var adjustedWidth = '';
                                var percent = parseInt(width.replace('%', ''), 10);
                                var widthFactor = percent / 100;
                                adjustedWidth += availableWidth * widthFactor;
                                width = adjustedWidth;
                            } else if (width !== '*') {
                                width = parseInt(width.replace('px', ''), 10);
                            }

                            if (width !== '*') {
                                width = width > 50 ? width : 50;
                                totalSetWidth += width;
                            }
                            widths += widths.length === 0 ? width : ',' + width;
                        }
                    }
                });
            }

            var unsetColumns = (widths.match(/\*/g) || []).length;
            var adjustedAvgWidth = ((0, _jquery2.default)('#' + this._gridId).width() - totalSetWidth) / unsetColumns;
            adjustedAvgWidth = adjustedAvgWidth > 50 ? adjustedAvgWidth : 50;
            widths = widths.replace(/\*/g, adjustedAvgWidth);
            return widths;
        };

        TwGridAdvanced.prototype._createColumnAlignments = function _createColumnAlignments() {
            var _this11 = this;

            var alignments = '';
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this11._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this11._cfg.findColumnDefinition(columnId);
                        if (columnDef) {
                            alignments += alignments.length === 0 ? columnDef.textAlignment : ',' + columnDef.textAlignment;
                        }
                    }
                });
            }
            return alignments;
        };

        TwGridAdvanced.prototype._toggleDefaultTooltips = function _toggleDefaultTooltips() {
            var enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this._performanceMonitor.startTime('toggleDefaultTooltips');
            var tooltips = [];
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function () {
                    tooltips.push(enabled.toString());
                });
            }
            this._gridAdvanced.enableTooltips(tooltips.join(','));
            this._performanceMonitor.endTime('toggleDefaultTooltips');
        };

        TwGridAdvanced.prototype._createColumnVisibility = function _createColumnVisibility() {
            var _this12 = this;

            var visibility = '';
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this12._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this12._cfg.findColumnDefinition(columnId);
                        if (columnDef) {
                            visibility += visibility.length === 0 ? columnDef.hidden : ',' + columnDef.hidden;
                        }
                    }
                });
            }
            return visibility;
        };

        TwGridAdvanced.prototype._getLastVisibleColumn = function _getLastVisibleColumn(columnIndex) {
            var _this13 = this;

            var visibility = '';
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this13._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var hidden = !(columnIndex === index);
                        visibility += visibility.length === 0 ? hidden : ',' + hidden;
                    }
                });
            }
            return visibility;
        };

        TwGridAdvanced.prototype._areAllColumnsHidden = function _areAllColumnsHidden() {
            var allColumnsHidden = true;
            var startIndex = 0;
            if (this._splitIndex !== -1) {
                startIndex = this._splitIndex;
            }
            for (var i = startIndex; i < this._gridAdvanced.getColumnCount(); i++) {
                if (!this._gridAdvanced.isColumnHidden(i)) {
                    allColumnsHidden = false;
                    break;
                }
            }
            return allColumnsHidden;
        };

        TwGridAdvanced.prototype._getHiddenColumns = function _getHiddenColumns() {
            var hiddenColumns = [];
            for (var i = 0; i < this._gridAdvanced.getColumnCount(); i++) {
                if (this._gridAdvanced.isColumnHidden(i)) {
                    hiddenColumns.push(i);
                }
            }
            return hiddenColumns;
        };

        TwGridAdvanced.prototype._getVisibleColumnsCount = function _getVisibleColumnsCount() {
            var count = 0;
            for (var i = 0; i < this._gridAdvanced.getColumnCount(); i++) {
                if (!this._gridAdvanced.isColumnHidden(i)) {
                    count++;
                }
            }
            return count;
        };

        TwGridAdvanced.prototype._createSearchControls = function _createSearchControls() {
            var vertAlign = this._cfg.searchSettings.location,
                align = this._cfg.searchSettings.alignment;

            if (this._cfg.searchSettings.enabled) {
                var searchToolbarId = this._gridId + '-search-container';
                if (!this._searchToolbarElement) {
                    this._searchToolbarElement = (0, _jquery2.default)('<div style="display:inline-block;float:' + align + ';padding:0;" id="' + searchToolbarId + '"></div>');
                    (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').append(this._searchToolbarElement);
                }

                var searchBar = new dhtmlXToolbarObject(searchToolbarId);
                searchBar.addText(this._gridId + '_grid_search_label', 0, this._l8nTokens.search + ': ');
                searchBar.addInput(this._gridId + '_grid_search', 1, '', 150);
                searchBar.setAlign(align);
                var searchElem = (0, _jquery2.default)('#' + this._gridId + '-search-container .dhxtoolbar_input');
                searchElem.val(this._searchValue);
            }
        };

        TwGridAdvanced.prototype._createResetButton = function _createResetButton() {
            var _this14 = this;

            if (this._cfg.resetButton) {
                this._enableReset = this._cfg.resetButton.enabled;
                this._resetLocation = this._cfg.resetButton.location;
            }

            var _resetLocation$split = this._resetLocation.split('-'),
                vertAlign = _resetLocation$split[0],
                align = _resetLocation$split[1];

            if (this._enableReset) {
                var resetToolbarId = this._gridId + '-reset-container';
                if (!this._resetToolbarElement) {
                    this._resetToolbarElement = (0, _jquery2.default)('<div style="display:inline-block;float:' + align + ';" id="' + resetToolbarId + '"></div>');
                    (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').prepend(this._resetToolbarElement);
                }

                var toolbar = new dhtmlXToolbarObject(resetToolbarId);
                toolbar.addButton('resetBtn', 0, this._l8nTokens.reset);
                toolbar.attachEvent('onClick', function (id) {
                    _this14._resetGrid(true);
                });
                toolbar.setAlign(align);
            }
        };

        TwGridAdvanced.prototype._resetGrid = function _resetGrid(refresh) {
            if (this._userSettingHandler) {
                this._userSettingHandler.resetUserSetting('gridSettings');
                this._userSettingHandler.resetUserSetting('splitGridColumn');
                this._userSettingHandler.resetUserSetting('sortGridColumns');
                this._userSettingHandler.resetUserSetting('gridOpen');
            }
            this._splitIndex = this._cfg.splitColumnIndex;
            this._updatedSplitIndex = true;
            this._updatedCfg = this._cfg;
            var searchElem = (0, _jquery2.default)('#' + this._gridId + '-search-container .dhxtoolbar_input');
            searchElem.val('');
            this._searchValue = '';
            this._applyDefaultRowSelections = true;
            this._resetColumnSort();
            if (refresh) {
                this.refresh();
            }
        };

        TwGridAdvanced.prototype._createPaginationControls = function _createPaginationControls() {
            if (this._cfg.paginationSettings) {
                this._paginationLocation = this._cfg.paginationSettings.pageLocation;
                var pagingEnabled = this._cfg.paginationSettings.enabled;
                if (pagingEnabled) {
                    var pagingSetting = this._cfg.paginationSettings.pagingType;
                    var pageSize = this._cfg.paginationSettings.pageLength;
                    var pageLocation = this._cfg.paginationSettings.pageLocation;
                    this._generatePagingL8n();
                    switch (pagingSetting) {
                        case 'simple':
                            this._gridAdvanced.setPagingWTMode(true, false, false, false);
                            this._searchPos = 4;
                            break;
                        case 'full_numbers':
                            this._gridAdvanced.setPagingWTMode(true, true, false, false);
                            this._searchPos = 6;
                            break;
                        case 'full':
                            this._gridAdvanced.setPagingWTMode(true, true, false, [5, 10, 25, 50, 100]);
                            this._searchPos = 8;
                            break;
                        case 'simple_numbers':
                        default:
                            this._gridAdvanced.setPagingWTMode(true, true, false, false);
                            this._searchPos = 6;
                            break;
                    }

                    var _pageLocation$split = pageLocation.split('-'),
                        vertAlign = _pageLocation$split[0],
                        align = _pageLocation$split[1];

                    var pagingToolbarId = this._gridId + '-paging-container';
                    if (!this._pagingToolbarElement) {
                        this._pagingToolbarElement = (0, _jquery2.default)('<div style="display:inline-block;float:' + align + ';" id="' + pagingToolbarId + '"></div>');
                        (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').append(this._pagingToolbarElement);
                    }

                    this._gridAdvanced.enablePaging(true, pageSize, 0, this._gridId + '-paging-container');
                    this._gridAdvanced.setPagingSkin('toolbar');
                }
            }
        };

        TwGridAdvanced.prototype._generatePaginationAndSearchControls = function _generatePaginationAndSearchControls() {
            var _this15 = this;

            this._performanceMonitor.startTime('generatePaginationControls');
            if (this._cfg.paginationSettings) {
                var pagingEnabled = this._cfg.paginationSettings.enabled;
                var pagingSetting = this._cfg.paginationSettings.pagingType;
                if (pagingEnabled) {
                    (function () {
                        var pagingToolBar = _this15._gridAdvanced.aToolBar;
                        if (pagingSetting !== 'simple') {
                            pagingToolBar.addText('totalRows', 3, 'of ' + _this15._gridAdvanced.getRowsNum());
                        }
                        if (pagingSetting === 'full_numbers' || pagingSetting === 'full') {
                            pagingToolBar.addText('pagesText', 4, 'Page');
                            _this15._createPageButtons(pagingToolBar, 1);
                            pagingToolBar.attachEvent('onClick', function (id) {
                                if (id.indexOf('pageBtn') > -1) {
                                    var pageNum = id.substring(7, id.length);
                                    _this15._gridAdvanced.changePage(pageNum);
                                } else if (id.indexOf('perpagenum') > -1) {
                                    var pageSize = id.substring(11, id.length);
                                    _this15._gridAdvanced.changePage(1);
                                    _this15._cfg.paginationSettings.pageLength = pageSize;
                                    _this15._deletePageButtons(pagingToolBar);
                                    _this15._createPageButtons(pagingToolBar, 1);
                                }
                            });
                        }
                    })();
                }
            }
            if (this._gridAdvanced.aToolBar && this._paginationLocation.indexOf('right') > -1) {
                this._gridAdvanced.aToolBar.setAlign('right');
            }
            (0, _jquery2.default)('.dhx_toolbar_btn .dhxtoolbar_text').each(function (index, item) {
                if (parseInt((0, _jquery2.default)(item).text(), 10) === 1) {
                    (0, _jquery2.default)(item).parent().attr('pageinfo', 'selected');
                }
            });
            this._performanceMonitor.endTime('generatePaginationControls');
        };

        TwGridAdvanced.prototype._deletePageButtons = function _deletePageButtons(pagingToolBar) {
            var pageButtons = [];
            pagingToolBar.forEachItem(function (itemId) {
                if (itemId.indexOf('pageBtn') > -1) {
                    pageButtons.push(itemId);
                }
            });
            pageButtons.forEach(function (itemId) {
                pagingToolBar.removeItem(itemId);
            });
        };

        TwGridAdvanced.prototype._createPageButtons = function _createPageButtons(pagingToolBar, currentPageIndex) {
            var pageSize = this._cfg.paginationSettings.pageLength;
            var numPages = Math.ceil(this._gridAdvanced.getRowsNum() / pageSize);
            var maxPageButtons = parseInt(this._cfg.paginationSettings.totalPageButtons, 10);
            var start = 1;
            var remainderPageButtons = 0;
            var totalPageButtons = 0;
            if (maxPageButtons > 0) {
                if (currentPageIndex % maxPageButtons === 1) {
                    start = currentPageIndex;
                    remainderPageButtons = currentPageIndex + maxPageButtons > numPages ? numPages - currentPageIndex + 1 : maxPageButtons;
                } else if (currentPageIndex % maxPageButtons === 0) {
                    start = currentPageIndex - maxPageButtons > 0 ? currentPageIndex - maxPageButtons + 1 : 1;
                    remainderPageButtons = start + maxPageButtons > numPages ? numPages - start + 1 : maxPageButtons;
                } else if (currentPageIndex % maxPageButtons > 1) {
                    start = currentPageIndex - currentPageIndex % maxPageButtons + 1;
                    remainderPageButtons = start + maxPageButtons > numPages ? numPages - start + 1 : maxPageButtons;
                }
                totalPageButtons = numPages <= maxPageButtons ? numPages : remainderPageButtons;
                var pageNum = start;
                for (var i = 0; i < totalPageButtons; i++) {
                    pagingToolBar.addButton('pageBtn' + pageNum, 5 + i, pageNum);
                    pageNum++;
                }
            }
            return totalPageButtons;
        };

        TwGridAdvanced.prototype._updatePaginationButtons = function _updatePaginationButtons(currentPageIndex) {
            var paginationToolBar = this._gridAdvanced.aToolBar;
            var pagingSetting = this._cfg.paginationSettings.pagingType;
            if (pagingSetting === 'full_numbers' || pagingSetting === 'full') {
                this._deletePageButtons(paginationToolBar);
                this._createPageButtons(paginationToolBar, currentPageIndex);
                this._resizePaginationControls();
            }
        };

        TwGridAdvanced.prototype._resizePaginationControls = function _resizePaginationControls() {
            if (this._cfg.paginationSettings.enabled) {
                var toolbarLocation = this._cfg.paginationSettings.pageLocation.indexOf('top') > -1 ? 'top' : 'bottom';
                var currentToolbarWidth = (0, _jquery2.default)('#' + this._gridId + '-' + toolbarLocation + '-container').innerWidth();
                var firstToolbarElement = (0, _jquery2.default)('#' + this._gridId + '-' + toolbarLocation + '-container').find('.dhx_toolbar_btn.dhxtoolbar_btn_dis');

                var arrowButtonWidth = firstToolbarElement.innerWidth();
                var resultsWidth = firstToolbarElement.nextAll().eq(1).outerWidth();
                var totalRowsWidth = firstToolbarElement.nextAll().eq(2).outerWidth();
                var pageTextWidth = firstToolbarElement.nextAll().eq(3).innerWidth();
                var pageButtonWidth = firstToolbarElement.nextAll(4).innerWidth();
                var rowsPerPageWidth = firstToolbarElement.siblings('.dhx_toolbar_text').nextAll().eq(3).innerWidth();
                this._updatePaginationToolbar(currentToolbarWidth, arrowButtonWidth, totalRowsWidth, pageTextWidth, resultsWidth, pageButtonWidth, rowsPerPageWidth);
            }
        };

        TwGridAdvanced.prototype._updatePaginationToolbar = function _updatePaginationToolbar(currentToolbarWidth, arrowButtonWidth, totalRowsWidth, pageTextWidth, resultsWidth, pageButtonWidth, rowsPerPageWidth) {
            var _this16 = this;

            var pagingSetting = this._cfg.paginationSettings.pagingType;
            var minToolbarWidth = arrowButtonWidth * 4;
            var simpleNumbersMinWidth = minToolbarWidth + resultsWidth + totalRowsWidth + 16;
            var fullNumbersMinWidth = pageTextWidth + pageButtonWidth * this._cfg.paginationSettings.totalPageButtons + simpleNumbersMinWidth;
            var fullMinWidth = fullNumbersMinWidth + rowsPerPageWidth;

            this._gridAdvanced.aToolBar.forEachItem(function (itemId) {
                if (currentToolbarWidth < simpleNumbersMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers' || pagingSetting === 'simple_numbers')) {
                    if (itemId === 'results' || itemId.indexOf('pageBtn') > -1 || itemId === 'pagesText' || itemId === 'perpagenum' || itemId === 'totalRows') {
                        _this16._gridAdvanced.aToolBar.hideItem(itemId);
                    }
                }
                if (currentToolbarWidth >= simpleNumbersMinWidth && currentToolbarWidth < fullNumbersMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers' || pagingSetting === 'simple_numbers')) {
                    if (itemId.indexOf('pageBtn') > -1 || itemId === 'perpagenum' || itemId === 'pagesText') {
                        _this16._gridAdvanced.aToolBar.hideItem(itemId);
                    } else if (itemId === 'results' || itemId === 'totalRows') {
                        _this16._gridAdvanced.aToolBar.showItem(itemId);
                    }
                }
                if (currentToolbarWidth >= fullNumbersMinWidth && currentToolbarWidth < fullMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers')) {
                    if (itemId === 'perpagenum') {
                        _this16._gridAdvanced.aToolBar.hideItem(itemId);
                    } else if (itemId === 'pagesText' || itemId.indexOf('pageBtn') > -1) {
                        _this16._gridAdvanced.aToolBar.showItem(itemId);
                    }
                } else if (currentToolbarWidth >= fullMinWidth) {
                    if (pagingSetting === 'simple_numbers' && (itemId === 'results' || itemId === 'totalRows')) {
                        _this16._gridAdvanced.aToolBar.showItem(itemId);
                    }
                    if ((pagingSetting === 'full_numbers' || pagingSetting === 'full') && (itemId.indexOf('pageBtn') > -1 || itemId === 'pagesText')) {
                        _this16._gridAdvanced.aToolBar.showItem(itemId);
                    }
                    if (pagingSetting === 'full' && itemId === 'perpagenum') {
                        _this16._gridAdvanced.aToolBar.showItem(itemId);
                    }
                }
            });
        };

        TwGridAdvanced.prototype._formatRowsInView = function _formatRowsInView() {
            var isScrolling = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            this._performanceMonitor.startTime('formatRowsInView');

            var saveGridUserSettings = void 0;
            var saveSortColumnUserSettings = void 0;
            var topRowIndex = 0;
            var bottomRowIndex = 0;

            if (this._userSettingHandler) {
                saveGridUserSettings = this._userSettingHandler.readSetting('gridSettings');
                saveSortColumnUserSettings = this._userSettingHandler.readSetting('sortGridColumns');
            }

            this._orderColumns();

            if (!isScrolling) {
                this._columnSortHandler.setColumnSort(saveSortColumnUserSettings);
            }

            var totalRows = this._gridAdvanced.getRowsNum();
            if (this._cfg && this._cfg.paginationSettings.enabled) {
                topRowIndex = (this._currentPage - 1) * this._cfg.paginationSettings.pageLength;
                bottomRowIndex = topRowIndex + this._cfg.paginationSettings.pageLength;
            } else {
                var state = this._gridAdvanced.getStateOfView();
                var visibleHeight = (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.objbox').height();
                var visibleRowCount = parseInt(visibleHeight / this._cfg.rowDefinition.minRowHeight, 10);
                topRowIndex = state[0] - 100 < 0 ? 0 : state[0] - 100;

                bottomRowIndex = state[0] + visibleRowCount + 100;
                bottomRowIndex = bottomRowIndex < totalRows ? bottomRowIndex : totalRows;
            }
            this._formatRowRange(topRowIndex, bottomRowIndex);
            this._columnSortHandler.removeColumnSortStyles();
            this._orderColumns(saveGridUserSettings);
            this._columnSortHandler.addColumnSortStyles();
            if (this._isTreeGrid) {
                (0, _jquery2.default)('.objbox .treegrid_cell').css({ 'white-space': '', overflow: '', 'line-height': '', height: '' });
            }
            this._performanceMonitor.endTime('formatRowsInView');
        };

        TwGridAdvanced.prototype._formatRowRange = function _formatRowRange(start, end) {
            _logger.Logger.debug('Formatting row range ' + start + '-' + end + ' of(' + this._gridAdvanced.getRowsNum() + ')');
            for (var i = start; i <= end; i++) {
                var rowId = this._gridAdvanced.getRowId(i);
                if (rowId) {
                    var gridRow = this._dhtmlxTableData.getRowById(rowId);
                    if (gridRow) {
                        this._setRowSize(gridRow);
                        this._formatRow(gridRow);
                    } else {
                        _logger.Logger.error('No row object found with row id ' + rowId);
                    }
                }
            }
        };

        TwGridAdvanced.prototype._formatRow = function _formatRow(gridRow) {
            if (gridRow && !gridRow.isFormatted) {
                this._rowFormatterFormatRow(this._dhtmlxTableData.allColumns, gridRow);

                this._formatColumns(this._dhtmlxTableData.allColumns, gridRow);
                this._convertRowDataValues(this._dhtmlxTableData.allColumns, gridRow);
                gridRow.isFormatted = true;
            }

            if (this._splitIndex > -1 && this._splitIndex < this._dhtmlxTableData.columnIds.split(',').length) {
                var gridCell = this._gridAdvanced.cells(gridRow.id, this._splitIndex).cell;
                var splitCell = this._gridAdvanced.cells(gridRow.id, 0).cell;
                var rowHeight = (0, _jquery2.default)(gridCell).parent().height();
                var splitRowHeight = (0, _jquery2.default)(splitCell).parent().height();
                if (rowHeight !== splitRowHeight) {
                    rowHeight = rowHeight > splitRowHeight ? rowHeight : splitRowHeight;
                    rowHeight = Math.round(rowHeight) + 2;
                    (0, _jquery2.default)(splitCell).parent().height(rowHeight);
                    (0, _jquery2.default)(gridCell).parent().height(rowHeight);
                }
            }
        };

        TwGridAdvanced.prototype._createChildGridHandler = function _createChildGridHandler() {
            var _this17 = this;

            return new _childGridHandler.ChildGridHandler(this._gridId, this._gridAdvanced, this._dhtmlxTableData, this._childDataServiceInvoker, this._cfg, function () {
                _this17._resizeColumns(-1);
                _this17._formatRowsInView();
                _this17._selectionHandler.refreshSelections();
            });
        };

        TwGridAdvanced.prototype._generatePagingL8n = function _generatePagingL8n() {
            this._gridAdvanced.i18n.paging = {
                results: this._l8nTokens.results,
                records: this._l8nTokens.records,
                to: this._l8nTokens.to,
                page: this._l8nTokens.page,
                perpage: this._l8nTokens.perpage,
                first: this._l8nTokens.first,
                previous: this._l8nTokens.previous,
                found: this._l8nTokens.found,
                next: this._l8nTokens.next,
                last: this._l8nTokens.last,
                of: this._l8nTokens.of,
                notfound: this._l8nTokens.notfound
            };
        };

        TwGridAdvanced.prototype._setupRowSelectionBindings = function _setupRowSelectionBindings() {
            this._performanceMonitor.startTime('setupRowSelectionBindings');
            if (this._cfg.rowDefinition && this._selectionHandler) {
                this._selectionHandler.setupBindings(this._cfg.rowDefinition.selection);
            }
            this._performanceMonitor.endTime('setupRowSelectionBindings');
        };

        TwGridAdvanced.prototype._splitColumns = function _splitColumns() {
            var _this18 = this;

            if (!this._splitEnabled) {
                return;
            }
            this._performanceMonitor.startTime('splitColumns');
            var initHeight = (0, _jquery2.default)(this._gridAdvanced.entBox).children('.objbox').height();
            var splitIndexConfig = -1;
            if (this._userSettingHandler) {
                splitIndexConfig = this._userSettingHandler.readSetting('splitGridColumn');
            }
            if (!this._splitIndex) {
                if (this._cfg && this._cfg.splitColumnIndex && this._cfg.splitColumnIndex < this._dhtmlxTableData.columns.length) {
                    this._splitIndex = this._cfg.splitColumnIndex;
                } else {
                    this._splitIndex = -1;
                }
            }

            if (splitIndexConfig > 0) {
                this._splitIndex = splitIndexConfig;
            }

            if (this._splitIndex >= 0) {
                this._gridAdvanced.splitAt(this._splitIndex);
                this._hiddenColumns.forEach(function (col, index) {
                    _this18._gridAdvanced.setColumnHidden(col, true);
                });
                if (this._userSettingHandler && this._userSettingHandler.readSetting('gridSettings')) {
                    var colWidths = this._userSettingHandler.readSetting('gridSettings').columnWidths;
                    colWidths.forEach(function (index, width) {
                        if (isNaN(width)) {
                            width = 0;
                        }
                        _this18._gridAdvanced.setColWidth(index, width);
                    });
                }
                this._resizeSplitColumns();
                this._gridAdvanced.setColWidth(0, this._gridAdvanced.getColWidth(0));
                (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.objbox').height(initHeight);
                var splitContainers = (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.objbox');
                (0, _jquery2.default)(splitContainers[0]).parent().addClass('split_left');
                (0, _jquery2.default)(splitContainers[1]).parent().addClass('split_right');
            }
            (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.xhdr th').parent().css('cssText', 'height: 0px !important');
            (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.xhdr').css('cssText', 'height: auto !important');

            if (this._splitIndex > -1) {
                var idSelector = '#' + this._gridId;
                var styleBlock = '<style>' + idSelector + ' .objbox { overflow-x: scroll !important; }</style>';
                (0, _jquery2.default)(idSelector).parent().prepend(styleBlock);
            }
            this._performanceMonitor.endTime('splitColumns');
        };

        TwGridAdvanced.prototype._attachEvents = function _attachEvents() {
            var _this19 = this;

            this._gridAdvanced.attachEvent('onDynXLS', function (rowId) {
                var gridRow = _this19._dhtmlxTableData.getRowById(rowId);
                var childGridHandler = _this19._createChildGridHandler();
                if (!gridRow.isExpanded) {
                    if (!_this19._exceedsMaxRowCacheSize()) {
                        childGridHandler.expandChildGrid(gridRow.id);
                        _this19._saveRowExpansionState();
                    } else {
                        _this19._maxRowCacheReached = false;
                        _this19._showMaxRowCacheExceededMessage();
                    }
                } else {
                    _this19._showClearingCacheMessage(gridRow.rows.length);
                    childGridHandler.collapseChildGrid(gridRow.id);
                    _this19._saveRowExpansionState();
                    _this19._maxRowCacheExceededMsgShown = false;
                }
            });

            this._gridAdvanced.attachEvent('onOpenEnd', function (rowId, state) {
                if (state === 1) {
                    _this19._formatRowsInView();
                } else {
                    var childGridHandler = _this19._createChildGridHandler();
                    var gridRow = _this19._dhtmlxTableData.getRowById(rowId);
                    _this19._showClearingCacheMessage(gridRow.rows.length);
                    childGridHandler.collapseChildGrid(rowId);
                    _this19._maxRowCacheExceededMsgShown = false;
                }
                _this19._resizeColumns(-1);
                _this19._saveRowExpansionState();
            });

            this._gridAdvanced.attachEvent('onColumnHidden', function (index, state) {
                var allColumnsHidden = _this19._areAllColumnsHidden();
                if (_this19._splitIndex === -1) {
                    if (allColumnsHidden) {
                        _this19._gridAdvanced.setColumnHidden(index, false);
                    }
                    _this19._resizeColumns(index, state);
                    _this19._storeUserGridSettings();
                    _this19._saveColumnWidthToCookie();
                    _this19._adjustHorizontalOffset();
                } else if (allColumnsHidden || index < _this19._splitIndex) {
                    _this19._gridAdvanced.setColumnHidden(index, false);
                } else {
                    (0, _jquery2.default)('.dhtmlxMenu_material_SubLevelArea_Polygon').remove();
                    _this19._updatedSplitIndex = true;
                    _this19.refresh();
                }
            });
            this._gridAdvanced.attachEvent('onPageChanged', function (pageNum) {
                _this19._updatePaginationButtons(pageNum);
                _this19._currentPage = pageNum;
                (0, _jquery2.default)('.dhx_toolbar_btn').attr('pageinfo', '');
                (0, _jquery2.default)('.dhx_toolbar_btn .dhxtoolbar_text').each(function (index, item) {
                    if (parseInt((0, _jquery2.default)(item).text(), 10) === _this19._currentPage) {
                        (0, _jquery2.default)(item).parent().attr('pageinfo', 'selected');
                    }
                });
                _this19._formatRowsInView();
            });

            this._gridAdvanced.attachEvent('onResize', function (cIndex, cWidth) {
                var cId = _this19._gridAdvanced.getColumnId(cIndex);
                _this19._columnConfigs.forEach(function (col) {
                    if (col.id === cId) {
                        col.width = cWidth + 'px';
                    }
                });
            });

            this._gridAdvanced.attachEvent('onResizeEnd', function () {
                _this19._resizeColumns(-1);
                _this19._saveColumnWidthToCookie();
            });

            this._gridAdvanced.attachEvent('onBeforeSorting', function (index, type, direction) {
                if (_this19._cfg.enableColumnSorting) {
                    _this19._columnSortHandler.handleColumnSortEvent(index, type, direction);
                    _this19._queryData();
                    _this19._applyDefaultRowSelections = false;
                }
                return false;
            });

            if (this._cfg && this._cfg._columnDefinitions && this._cfg._columnDefinitions.length > 0) {
                this._gridAdvanced.attachEvent('onMouseOver', this._showTooltip.bind(this));
            }
            if (this._cfg && this._cfg._headerDefinition && this._cfg._headerDefinition.overflow === 'tooltip') {
                (0, _jquery2.default)(this._gridAdvanced.entBox).find('.xhdr td').on('mouseenter', function (event) {
                    _this19._tooltip.setTooltip((0, _jquery2.default)(event.currentTarget).find('.hdrcell').text(), (0, _jquery2.default)(event.currentTarget), _this19._gridId);
                });
            }

            this._gridAdvanced.attachEvent('onAfterCMove', function (cInd, posInd) {
                _this19._adjustHorizontalOffset();
                _this19._storeUserGridSettings();

                _this19._gridAdvanced.saveOrderToCookie(_this19._userSettingHandler.userCookie, 'expires=' + _this19._expirationDate.toUTCString());
                _this19._gridAdvanced.saveHiddenColumnsToCookie(_this19._userSettingHandler.userCookie, 'expires=' + _this19._expirationDate.toUTCString());
            });

            this._gridAdvanced.attachEvent('onResize', function (col, size) {
                _this19._storeUserGridSettings();
                if (_this19._splitIndex > -1) {
                    _this19._resizeSplitColumns();
                }
                if (size >= 50 && _this19._splitIndex <= col) {
                    _this19._gridAdvanced.setColWidth(col, size);

                    _this19._formatRowsInView();
                } else if (size < 50) {
                    _this19._gridAdvanced.setColWidth(col, 50);
                }

                _this19._gridAdvanced.saveHiddenColumnsToCookie(_this19._userSettingHandler.userCookie, 'expires=' + _this19._expirationDate.toUTCString());

                _this19._updateCurrentTableWidth();
            });

            this._gridAdvanced.attachEvent('onScroll', this._handleScrollEvent.bind(this));

            if (this._cfg.searchSettings.enabled) {
                (function () {
                    var searchElem = (0, _jquery2.default)('#' + _this19._gridId + '-search-container .dhxtoolbar_input');
                    searchElem.on('keyup', _lodashAmd2.default.debounce(function () {
                        _this19._searchValue = searchElem.val();
                        _this19._queryData();
                        _this19._applyDefaultRowSelections = false;
                    }, 1500));
                })();
            }

            (0, _jquery2.default)('#' + this._gridId + ' .xhdr').mousedown(function (event) {
                if (event.which === 3) {
                    (function () {
                        var styleBlockId = _this19._gridId + '_sub_menu_style';
                        (0, _jquery2.default)('#' + styleBlockId).remove();
                        var idSelector = '#' + _this19._gridId;
                        var styleRules = '.sub_item { display: none }';
                        var styleBlock = '<style id="' + styleBlockId + '">' + styleRules + '</style>';
                        (0, _jquery2.default)(idSelector).prepend(styleBlock);
                        var styleRemoved = false;

                        setTimeout(function () {
                            (0, _jquery2.default)('.dhtmlxMenu_material_SubLevelArea_Polygon:visible .sub_item').each(function (index, item) {
                                if (index < _this19._splitIndex) {
                                    (0, _jquery2.default)(item).hide();
                                } else if (!styleRemoved) {
                                    (0, _jquery2.default)('#' + styleBlockId).remove();
                                    styleRemoved = true;
                                }
                            });
                        }, 200);
                    })();
                }
            });
        };

        TwGridAdvanced.prototype._triggerGridEvent = function _triggerGridEvent(eventName, parameters) {
            (0, _jquery2.default)('#' + this._gridId).trigger(eventName, parameters);
        };

        TwGridAdvanced.prototype._resetColumnSort = function _resetColumnSort() {
            this._columnSortHandler = new _columnSortHandler.ColumnSortHandler(this._gridAdvanced, this._cfg, this._userSettingHandler, this._formatRowsInView.bind(this));
            this._columnSortHandler.setColumnSort();
        };

        TwGridAdvanced.prototype._storeUserGridSettings = function _storeUserGridSettings() {
            if (!this._ignoreColumnMoveEvents && this._dhtmlxTableData.columns.length > 0) {
                var gridWidths = [this._dhtmlxTableData.columns.length];
                var columnOrder = [this._dhtmlxTableData.columns.length];
                var columnHidden = [this._dhtmlxTableData.columns.length];

                for (var i = 0; i < this._dhtmlxTableData.columns.length; i++) {
                    var column = this._dhtmlxTableData.columns[i];
                    var index = this._gridAdvanced.getColIndexById(column);
                    gridWidths[index] = this._gridAdvanced.getColWidth(index);
                    columnOrder[index] = i;
                    columnHidden[index] = this._gridAdvanced.isColumnHidden(index);
                }
                var gridSetting = {
                    columnWidths: gridWidths,
                    columnOrder: columnOrder,
                    columnVisibility: columnHidden
                };
                if (this._userSettingHandler) {
                    this._userSettingHandler.setUserSetting('gridSettings', gridSetting);
                }
            }
        };

        TwGridAdvanced.prototype._saveRowExpansionState = function _saveRowExpansionState() {
            if (this._isTreeGrid && this._userSettingHandler && this._cfg.preserveRowExpansion) {
                this._gridAdvanced.saveOpenStates(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
            }
        };

        TwGridAdvanced.prototype._handleScrollEvent = function _handleScrollEvent(scrollLeft, scrollTop) {
            var _this20 = this;

            if (this._scrollTimeout) {
                clearTimeout(this._scrollTimeout);
            }
            this._scrollTimeout = setTimeout(function () {
                if (scrollTop > -1) {
                    _this20._formatRowsInView(true);
                }
            }, 100);
        };

        TwGridAdvanced.prototype._adjustHorizontalOffset = function _adjustHorizontalOffset() {
            var _this21 = this;

            var styleBlockId = this._gridId + '_header_offset_block';
            (0, _jquery2.default)('#' + styleBlockId).remove();
            (0, _jquery2.default)('#' + this._gridId + ' .headerTail').removeClass('headerTail');
            if (this._includeHorizScrollOffset()) {
                (function () {
                    var headerElements = (0, _jquery2.default)('#' + _this21._gridId + ' .xhdr tr th');

                    headerElements = headerElements.filter(function (index) {
                        return headerElements.eq(index).width() !== 0;
                    });
                    var tailElement = (0, _jquery2.default)(headerElements.last());
                    tailElement.addClass('headerTail');
                    var styleRules = '';
                    var idSelector = '#' + _this21._gridId;
                    var scrollOffset = _this21._getScrollWidth();
                    styleRules += idSelector + ' .headerTail { width: ' + (tailElement.width() + scrollOffset) + 'px !important }';
                    var styleBlock = '<style id="' + styleBlockId + '">' + styleRules + '</style>';
                    (0, _jquery2.default)(idSelector).prepend(styleBlock);
                })();
            }
        };

        TwGridAdvanced.prototype._includeHorizScrollOffset = function _includeHorizScrollOffset() {
            var scrollBars = false;
            var tableElement = (0, _jquery2.default)(this._gridAdvanced.entBox).children('.objbox').children('table');
            var parentContainer = (0, _jquery2.default)(this._gridAdvanced.entBox).closest('.widget-content .widget-gridadvanced');
            if (parentContainer && tableElement) {
                scrollBars = tableElement.width() > parentContainer.width();
            }
            return scrollBars;
        };

        TwGridAdvanced.prototype._adjustHeaders = function _adjustHeaders() {
            var maxHeight = 0;
            (0, _jquery2.default)(this._gridAdvanced.entBox).parent().find('.xhdr').each(function (index, hdr) {
                var newHeight = (0, _jquery2.default)(hdr).height();
                if (newHeight > maxHeight) {
                    maxHeight = newHeight;
                }
            });
            if (maxHeight > 0) {
                var styleRules = '';
                var idSelector = '#' + this._gridId;
                styleRules += idSelector + ' .xhdr { height: ' + maxHeight + 'px !important }';
                var styleBlock = '<style>' + styleRules + '</style>';
                (0, _jquery2.default)(idSelector).prepend(styleBlock);
            }
        };

        TwGridAdvanced.prototype._showTooltip = function _showTooltip(id, index) {
            var columnId = this._gridAdvanced.getColumnId(index);
            if (this._cfg.findColumnDefinition(columnId).allowsTooltips) {
                var cellObj = this._gridAdvanced.cellById(id, index);
                this._tooltip.setTooltip(cellObj.getValue(), cellObj.cell, this._gridId);
            }
            return false;
        };

        TwGridAdvanced.prototype._updatePercentColumnConfigs = function _updatePercentColumnConfigs(col, totalActualWidth, totalActualPercentage) {
            var currentSetWidth = this._gridAdvanced.getColWidth(this._gridAdvanced.getColIndexById(col.id));
            var actualPercentage = currentSetWidth / totalActualWidth;
            actualPercentage = Number(Math.round(actualPercentage + 'e2') + 'e-2');
            var currentPercentage = parseInt(col.width, 10) / totalActualPercentage;
            currentPercentage = Number(Math.round(currentPercentage + 'e2') + 'e-2');
            if (actualPercentage !== currentPercentage) {
                col.width = currentSetWidth + 'px';
            }
        };

        TwGridAdvanced.prototype._updateAutoWidthColumnConfigs = function _updateAutoWidthColumnConfigs(col, totalActualWidth, autoWidthCount) {
            var currentSetWidth = this._gridAdvanced.getColWidth(this._gridAdvanced.getColIndexById(col.id));
            var actualPercentage = totalActualWidth / autoWidthCount / totalActualWidth;
            actualPercentage = Number(Math.round(actualPercentage + 'e2') + 'e-2');
            var currentPercentage = currentSetWidth / totalActualWidth;
            currentPercentage = Number(Math.round(currentPercentage + 'e2') + 'e-2');
            if (actualPercentage !== currentPercentage) {
                col.width = currentSetWidth + 'px';
            }
        };

        TwGridAdvanced.prototype._updateColumnConfigWidths = function _updateColumnConfigWidths() {
            var _this22 = this;

            var _getColumnConfigTotal = this._getColumnConfigTotals('%'),
                totalPercentageWidth = _getColumnConfigTotal.width,
                totalActualPercentage = _getColumnConfigTotal.percentage;

            var _getColumnConfigTotal2 = this._getColumnConfigTotals('*'),
                totalAutoWidth = _getColumnConfigTotal2.width,
                autoWidthCount = _getColumnConfigTotal2.count;

            this._columnConfigs.forEach(function (col) {
                if (col.width.indexOf('*') > -1) {
                    _this22._updateAutoWidthColumnConfigs(col, totalAutoWidth, autoWidthCount);
                }
                if (col.width.indexOf('%') > -1) {
                    _this22._updatePercentColumnConfigs(col, totalPercentageWidth, totalActualPercentage);
                }
            });
        };

        TwGridAdvanced.prototype._getColumnConfigTotals = function _getColumnConfigTotals(symbol) {
            var _this23 = this;

            var _columnConfigs$reduce = this._columnConfigs.reduce(function (total, col) {
                if (col.width.indexOf(symbol) > -1) {
                    var w = _this23._gridAdvanced.getColWidth(_this23._gridAdvanced.getColIndexById(col.id));
                    if (w > 0) {
                        total[0] += w;
                        total[1] += parseInt(col.width, 10);
                        total[2] += 1;
                    }
                }
                return total;
            }, [0, 0, 0]),
                width = _columnConfigs$reduce[0],
                percentage = _columnConfigs$reduce[1],
                count = _columnConfigs$reduce[2];

            return { width: width, percentage: percentage, count: count };
        };

        TwGridAdvanced.prototype._saveColumnWidthToCookie = function _saveColumnWidthToCookie() {
            if (this._userSettingHandler) {
                this._gridAdvanced.saveSizeToCookie(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
                this._gridAdvanced.saveHiddenColumnsToCookie(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
            }
        };

        TwGridAdvanced.prototype._readColumnSettingPersistence = function _readColumnSettingPersistence() {
            this._performanceMonitor.startTime('readColumnSettingPersistence');
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled && this._dhtmlxTableData && this._dhtmlxTableData._data.rows.length > 0) {
                if (this._userSettingHandler.hasUserSetting('gridSettings')) {
                    try {
                        this._gridAdvanced.loadOrderFromCookie(this._userSettingHandler.userCookie);
                        this._gridAdvanced.loadSizeFromCookie(this._userSettingHandler.userCookie);
                        this._gridAdvanced.loadHiddenColumnsFromCookie(this._userSettingHandler.userCookie);
                        this._updateColumnConfigWidths();
                        this._initResize = true;
                    } catch (ex) {
                        _logger.Logger.error('Failed loading grid configuration from cookie. Resetting user settings and loading with default configuration');
                        this._resetGrid(false);
                    }
                } else {
                    this._gridAdvanced.setColumnsVisibility(this._createColumnVisibility());
                    this._initResize = true;
                }

                if (this._isTreeGrid && this._userSettingHandler.hasUserSetting('gridOpen')) {
                    try {
                        this._gridAdvanced.loadOpenStates(this._userSettingHandler.userCookie);
                    } catch (ex) {
                        _logger.Logger.error('Failed loading tree-grid configuration from cookie. Resetting user settings and loading' + ' with default configuration');
                        this._resetGrid(false);
                    }
                }
            } else {
                this._gridAdvanced.setColumnsVisibility(this._createColumnVisibility());
            }
            this._performanceMonitor.endTime('readColumnSettingPersistence');
        };

        TwGridAdvanced.prototype._enableColumnSettingPersistence = function _enableColumnSettingPersistence() {
            this._performanceMonitor.startTime('enableColumnSettingPersistence');
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled) {
                this._gridAdvanced.enableResizing(this._getColumnResizeList(), 'expires=' + this._expirationDate.toUTCString());
                this._gridAdvanced.enableAutoSizeSaving(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
                this._gridAdvanced.enableOrderSaving(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
                this._gridAdvanced.enableAutoHiddenColumnsSaving(this._userSettingHandler.userCookie, 'expires=' + this._expirationDate.toUTCString());
                this._gridAdvanced.enableHeaderMenu();
            }
            this._performanceMonitor.endTime('enableColumnSettingPersistence');
        };

        TwGridAdvanced.prototype.resetTableSizing = function resetTableSizing() {
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled && this._dhtmlxTableData && this._dhtmlxTableData._data.rows.length > 0) {
                if (this._userSettingHandler.hasUserSetting('gridSettings')) {
                    this._gridAdvanced.loadSizeFromCookie(this._userSettingHandler.userCookie);
                    this._adjustHorizontalOffset();
                } else {
                    this._resizeColumns(-1);
                }
            } else {
                this._resizeColumns(-1);
            }
        };

        TwGridAdvanced.prototype._enableSmartRendering = function _enableSmartRendering() {
            if (!this._cfg.paginationSettings || !this._cfg.paginationSettings.enabled) {
                this._gridAdvanced.setAwaitedRowHeight(this._cfg.rowDefinition.minRowHeight);
                this._gridAdvanced.enableSmartRendering(true);
                this._gridAdvanced.enablePreRendering(50);
            }
        };

        TwGridAdvanced.prototype._exceedsMaxRowCacheSize = function _exceedsMaxRowCacheSize() {
            return this._cfg && this._cfg.maxRowCacheSize <= this._gridAdvanced.getRowsNum();
        };

        TwGridAdvanced.prototype._showMaxRowCacheExceededMessage = function _showMaxRowCacheExceededMessage() {
            if (!this._maxRowCacheExceededMsgShown) {
                this._statusTextMessageCallback('warning', this._l8nTokens.maxRowsWarning1 + this._cfg.maxRowCacheSize + this._l8nTokens.maxRowsWarning2 + this._l8nTokens.maxRowsWarning3, false);
                this._maxRowCacheExceededMsgShown = true;
            }
        };

        TwGridAdvanced.prototype._showClearingCacheMessage = function _showClearingCacheMessage(numberChildNodes) {
            if (this._maxRowCacheReached && numberChildNodes > 1000 || numberChildNodes >= 5000) {
                this._statusTextMessageCallback('info', this._l8nTokens.freeMemoryWarning, false);
            }
        };

        TwGridAdvanced.prototype._expandLoadedRows = function _expandLoadedRows() {
            if (this._cfg && this._cfg.expandAllLoadedLevels && this._updatedExpandRows === undefined) {
                if (this._gridAdvanced.getRowsNum() > 0) {
                    this._gridAdvanced.expandAll();
                }
            } else {
                this._expandOrRetrieveRows(this._updatedExpandRows, false);
                this._updatedExpandRows = undefined;
            }
        };

        TwGridAdvanced.prototype._expandOrRetrieveRows = function _expandOrRetrieveRows(rowIds, isRowSelection) {
            var _this24 = this;

            if (rowIds) {
                (function () {
                    var childGridHandler = _this24._createChildGridHandler();
                    rowIds = rowIds.split(',');
                    rowIds.forEach(function (id) {
                        if (_this24._cfg.includeRowExpansionParents) {
                            childGridHandler.expandPath(id, isRowSelection);
                        } else {
                            if (isRowSelection) {
                                id = _this24._gridAdvanced.getParentId(id);
                            }
                            _this24._gridAdvanced.openItem(id);
                        }
                    });
                })();
            }
        };

        TwGridAdvanced.prototype._resetSearch = function _resetSearch() {
            var _this25 = this;

            if (this._cfg.searchSettings.enabled) {
                (function () {
                    var searchElem = (0, _jquery2.default)('#' + _this25._gridId + '-search-container .dhxtoolbar_input');
                    searchElem.val(_this25._searchValue);

                    setTimeout(function () {
                        searchElem.focus();
                    }, 50);
                })();
            }
        };

        TwGridAdvanced.prototype._queryData = function _queryData() {
            this._queryHandler = new _queryHandler.QueryHandler(this._cfg, this._queryDataServiceInvoker);
            var query = this._queryHandler.createFilterQuery(this._searchValue, this._columnSortHandler._sortColumns, this._updatedQueryFilter);
            var params = [query.query];
            this._triggerGridEvent('queryGridColumns', params);
        };

        _createClass(TwGridAdvanced, [{
            key: 'defaultStyles',
            set: function set(styles) {
                this._defaultStyles = styles;
                this._cfg.styleDefinitions = this._defaultStyles;
                this._updateStyles();
            },
            get: function get() {
                return this._defaultStyles;
            }
        }, {
            key: 'selectionHandler',
            get: function get() {
                return this._selectionHandler;
            }
        }, {
            key: 'tooltip',
            set: function set(tooltip) {
                this._tooltip = tooltip;
            }
        }, {
            key: 'imagePath',
            set: function set(path) {
                this._imagePath = path;
                if (this._gridAdvanced) {
                    this._gridAdvanced.setImagePath(path);
                }
            }
        }, {
            key: 'menuIconsPath',
            set: function set(path) {
                this._menuIconsPath = path;
                if (this._menu) {
                    this._menu.setIconsPath(path);
                }
            }
        }, {
            key: 'structPath',
            set: function set(path) {
                this._structPath = path;
                if (this._menu) {
                    this._menu.loadStruct(path);
                }
            }
        }, {
            key: 'statusTextMessageCallback',
            set: function set(statusTextMessageCallback) {
                this._statusTextMessageCallback = statusTextMessageCallback;
            }
        }, {
            key: 'childDataServiceInvoker',
            set: function set(childDataServiceInvoker) {
                this._childDataServiceInvoker = childDataServiceInvoker;
            }
        }, {
            key: 'queryDataServiceInvoker',
            set: function set(queryDataServiceInvoker) {
                this._queryDataServiceInvoker = queryDataServiceInvoker;
            }
        }, {
            key: 'l8nTokens',
            set: function set(tokens) {
                this._l8nTokens = tokens;
            }
        }]);

        return TwGridAdvanced;
    }()) || _class);
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/tw-grid-advanced.js.map

gaRequire.define('tw-grid-advanced/logger',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var Logger = exports.Logger = function () {
        function Logger(defaultLogLevel) {
            _classCallCheck(this, Logger);

            this._defaultLogLevel = defaultLogLevel;
        }

        Logger.debug = function debug(message) {
            if (console) {
                console.debug(message);
            }
        };

        Logger.warn = function warn(message) {
            if (console) {
                console.warn(message);
            }
        };

        Logger.info = function info(message) {
            if (console) {
                console.info(message);
            }
        };

        Logger.error = function error(message) {
            if (console) {
                console.error(message);
            }
        };

        Logger.prototype.log = function log(message, logLevel) {
            var level = logLevel ? logLevel : this._defaultLogLevel;
            switch (level) {
                case 'debug':
                    this.debug(message);
                    break;
                case 'warn':
                    this.warn(message);
                    break;
                case 'info':
                    this.info(message);
                    break;
                case 'error':
                    this.error(message);
                    break;
                default:
                    this.debug(message);
            }
        };

        return Logger;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/logger.js.map

gaRequire.define('tw-grid-advanced/selection-handler',['exports', 'jquery', 'lodash-amd'], function (exports, _jquery, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.SelectionHandler = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var SelectionHandler = exports.SelectionHandler = function () {
        function SelectionHandler(isTreeGrid, gridAdvanced, dhtmlxTableData, rowSelectionCallback, expandRowCallback) {
            _classCallCheck(this, SelectionHandler);

            this._isTreeGrid = isTreeGrid;
            this._gridAdvanced = gridAdvanced;
            this._rowSelectionCallback = rowSelectionCallback;
            this._dhtmlxTableData = dhtmlxTableData;
            this._selections = {};
            this._expandRowCallback = expandRowCallback;
            this._triggerSelectionEvent = true;
            this._autoScroll = false;
        }

        SelectionHandler.prototype.refreshSelections = function refreshSelections() {
            this.setSelectionsById(_lodashAmd2.default.keys(this._selections));
        };

        SelectionHandler.prototype.autoScrollToLastSelected = function autoScrollToLastSelected() {
            if (this._autoScroll && this._lastSelectedId && this._gridAdvanced.getRowIndex(this._lastSelectedId) > -1) {
                this._gridAdvanced.showRow(this._lastSelectedId);
            }
        };

        SelectionHandler.prototype.setupBindings = function setupBindings(selectionType) {
            this._selectionType = selectionType;
            if (this._selectionType) {
                switch (selectionType) {
                    case 'multi':
                        this._gridAdvanced.enableMultiselect(true);
                        this._gridAdvanced.attachEvent('onSelectStateChanged', this._onSelectRows.bind(this));
                        break;
                    case 'single':
                        this._gridAdvanced.attachEvent('onRowSelect', this._onSelectRow.bind(this));
                        break;
                    case 'none':
                        this._gridAdvanced.attachEvent('onBeforeSelect', this._allowSelections);
                        break;
                    default:
                        this._selectionType = undefined;
                        break;
                }
            }
        };

        SelectionHandler.prototype._allowSelections = function _allowSelections() {
            return false;
        };

        SelectionHandler.prototype.setSelectionsById = function setSelectionsById(selections) {
            var _this = this;

            var newSelections = [];
            var currentSelected = this._gridAdvanced.getSelectedRowId();
            if (currentSelected) {
                currentSelected = currentSelected.split(',').sort();
            }
            if (selections) {
                newSelections = selections = selections.map(function (selection) {
                    return String(selection);
                });
                newSelections = newSelections.sort();
            }
            if (_lodashAmd2.default.isEqual(newSelections, currentSelected)) {
                return;
            }

            this._gridAdvanced.clearSelection();
            if (selections.length > 0) {
                this._triggerSelectionEvent = false;
                selections.forEach(function (id) {
                    _this._gridAdvanced.selectRowById(id, _this._selectionType === 'multi', false);

                    if (_this._isTreeGrid && _this._expandRowCallback) {
                        _this._expandRowCallback(id, true);
                    }
                });
                this._triggerSelectionEvent = true;
                this._onSelectRows(selections.join(','));
            }

            this._lastSelectedId = _lodashAmd2.default.difference(newSelections, currentSelected)[0];
            this.autoScrollToLastSelected();
            this._selections = this._convertIdsToGridType(selections);
        };

        SelectionHandler.prototype._convertIdsToGridType = function _convertIdsToGridType(ids) {
            var _this2 = this;

            var selections = {};
            ids.forEach(function (id) {
                selections[id] = _this2._gridAdvanced.getRowIndex(id);
            });
            return selections;
        };

        SelectionHandler.prototype.setSelections = function setSelections(selectionIndices) {
            var _this3 = this;

            if (selectionIndices) {
                selectionIndices = selectionIndices.map(function (index) {
                    return _this3._gridAdvanced.getRowId(index);
                });
                this.setSelectionsById(selectionIndices);
            }
        };

        SelectionHandler.prototype.removeBindings = function removeBindings() {
            (0, _jquery2.default)(this._gridAdvanced).off('click', 'tr');
        };

        SelectionHandler.prototype._onSelectRows = function _onSelectRows(ids) {
            if (!this._rowSelectionCallback || !this._triggerSelectionEvent) {
                return;
            }
            if (ids === undefined || ids === null || ids.length === 0) {
                this._selections = {};
                this._lastSelectedId = undefined;
                this._rowSelectionCallback(this.selectedRows, []);
                return;
            }
            var idsArray = ids.split(',');
            this._lastSelectedId = idsArray[idsArray.length - 1];
            this._selections = this._convertIdsToGridType(idsArray);
            if (this._isTreeGrid) {
                this._rowSelectionCallback(this.selectedRows, this._createSelectedRows());
            } else {
                this._rowSelectionCallback(this.selectedRows);
            }
        };

        SelectionHandler.prototype._onSelectRow = function _onSelectRow(rowId) {
            if (this._rowSelectionCallback) {
                this._lastSelectedId = rowId;
                this._selections = this._convertIdsToGridType([rowId]);
                if (this._isTreeGrid) {
                    this._rowSelectionCallback(this.selectedRows, this._createSelectedRows());
                } else {
                    this._rowSelectionCallback(this.selectedRows);
                }
            }
        };

        SelectionHandler.prototype._createSelectedRows = function _createSelectedRows() {
            var _this4 = this;

            var selectionData = [];
            if (this._dhtmlxTableData) {
                selectionData = this.selectedRows.map(function (id) {
                    var combinedData = null;
                    var rowData = _this4._dhtmlxTableData.getRowById(id);
                    if (rowData) {
                        combinedData = _lodashAmd2.default.zipObject(_this4._dhtmlxTableData.allColumns, rowData.rawData);
                    }
                    return combinedData;
                }).filter(function (row) {
                    return row !== null;
                });
            }
            return selectionData;
        };

        _createClass(SelectionHandler, [{
            key: 'gridAdvanced',
            set: function set(gridAdvanced) {
                this._gridAdvanced = gridAdvanced;
            }
        }, {
            key: 'dhtmlxTableData',
            set: function set(dhtmlxTableData) {
                this._dhtmlxTableData = dhtmlxTableData;
            }
        }, {
            key: 'selectedRows',
            get: function get() {
                var selections = [];
                if (this._isTreeGrid) {
                    selections = _lodashAmd2.default.keys(this._selections);
                } else {
                    selections = _lodashAmd2.default.values(this._selections);
                }
                return selections;
            }
        }, {
            key: 'autoScroll',
            set: function set(autoScroll) {
                this._autoScroll = autoScroll;
            },
            get: function get() {
                return this._autoScroll;
            }
        }]);

        return SelectionHandler;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/selection-handler.js.map

gaRequire.define('tw-grid-advanced/column-sort-handler',['exports', 'jquery', 'lodash-amd', '../../components/renderers/string-renderer', '../../components/renderers/boolean-renderer', '../../components/renderers/datetime-renderer', '../../components/renderers/number-renderer'], function (exports, _jquery, _lodashAmd, _stringRenderer, _booleanRenderer, _datetimeRenderer, _numberRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ColumnSortHandler = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ColumnSortHandler = exports.ColumnSortHandler = function () {
        function ColumnSortHandler(gridAdvanced, configuration, userSettingHandler, columnSortedCallback) {
            _classCallCheck(this, ColumnSortHandler);

            this._gridAdvanced = gridAdvanced;
            this._cfg = configuration;
            this._callback = columnSortedCallback;
            this._userSettingHandler = userSettingHandler;

            if (this._gridAdvanced) {
                this._gridAdvanced.enableStableSorting(true);
            }

            this._sortColumns = [];
        }

        ColumnSortHandler.prototype.setColumnSortDataTypes = function setColumnSortDataTypes(columns) {
            var _this = this;

            this._ctrlKeyDown = false;

            (0, _jquery2.default)(document).keydown(function (event) {
                _this._ctrlKeyDown = event.key === 'Control';
            });
            (0, _jquery2.default)(document).keyup(function (event) {
                _this._ctrlKeyDown = false;
            });

            var columnSort = '';
            columns.forEach(function (column, index) {
                var colSort = _this._getColumnSortDataType(column);
                columnSort += columnSort.length === 0 ? colSort : ',' + colSort;
            });
            this._gridAdvanced.setColSorting(columnSort);
        };

        ColumnSortHandler.prototype.setColumnSort = function setColumnSort(columnSortSetting) {
            if (!columnSortSetting && this._userSettingHandler) {
                columnSortSetting = this._userSettingHandler.readSetting('sortGridColumns');
            }
            if (columnSortSetting) {
                this._sortColumns = this._createSortColumns(columnSortSetting);
            } else if (this._cfg && this._cfg.multiColumnSortOrder) {
                this._sortColumns = this._cfg.multiColumnSortOrder;
            }
            if (this._sortColumns.length > 0) {
                this.removeColumnSortStyles();
                this.addColumnSortStyles();
            }
        };

        ColumnSortHandler.prototype.handleColumnSortEvent = function handleColumnSortEvent(columnIndex, type, direction) {

            var id = this._gridAdvanced.getColumnId(columnIndex);
            for (var i = 0; i < this._sortColumns.length; i++) {
                var column = this._sortColumns[i];
                if (column.id === id) {
                    direction = column.direction === 'asc' ? 'des' : 'asc';
                    break;
                }
            }

            var sortColumn = {
                id: id,
                type: type,
                direction: direction
            };

            this.removeColumnSortStyles();

            if (this._ctrlKeyDown) {
                var index = _lodashAmd2.default.findIndex(this._sortColumns, function (sc) {
                    return sc.id === id;
                });
                if (index > -1) {
                    var _column = this._sortColumns[index];

                    _column.direction = _column.direction === 'asc' ? 'des' : 'asc';
                } else {
                    this._sortColumns.push(sortColumn);
                }
                this._createMultiColumnSortCookie();
            } else {
                this._sortColumns = [];
                this._sortColumns.push(sortColumn);
                this._gridAdvanced.setSortImgState(true, columnIndex, direction);
                this._updateColumnSortSetting(sortColumn.id + ':' + direction);
            }
            this._callback();
        };

        ColumnSortHandler.prototype.addColumnSortStyles = function addColumnSortStyles() {
            for (var i = this._sortColumns.length - 1; i >= 0; i--) {
                var column = this._sortColumns[i];
                var target = this._gridAdvanced.getColIndexById(column.id);
                var dir = column.direction === 'des' ? 'dhxgrid_sort_desc_col' : 'dhxgrid_sort_asc_col';
                (0, _jquery2.default)(this._gridAdvanced.entBox).children('.xhdr').children('table').find('td').slice(target, target + 1).addClass(dir);
            }
        };

        ColumnSortHandler.prototype.removeColumnSortStyles = function removeColumnSortStyles() {
            var _this2 = this;

            this._sortColumns.forEach(function (column) {
                var target = _this2._gridAdvanced.getColIndexById(column.id);
                (0, _jquery2.default)(_this2._gridAdvanced.entBox).children('.xhdr').children('table').find('td').slice(target, target + 1).removeClass('dhxgrid_sort_desc_col dhxgrid_sort_asc_col');
            });
        };

        ColumnSortHandler.prototype._getColumnSortDataType = function _getColumnSortDataType(columnId) {
            var colSort = 'str';
            if (this._cfg && this._cfg.columnDefinitions) {
                if (columnId) {
                    var columnDef = this._cfg.findColumnDefinition(columnId);
                    if (columnDef && columnDef.columnFormatter && columnDef.columnFormatter.valueConverter) {
                        var valueConverter = columnDef.columnFormatter.valueConverter;
                        if (valueConverter instanceof _numberRenderer.NumberRenderer) {
                            colSort = 'int';
                        } else if (valueConverter instanceof _stringRenderer.StringRenderer || valueConverter instanceof _booleanRenderer.BooleanRenderer) {
                            colSort = 'str';
                        } else if (valueConverter instanceof _datetimeRenderer.DatetimeRenderer) {
                            colSort = 'date';
                        } else {
                            colSort = 'na';
                        }
                    }
                }
            }
            return colSort;
        };

        ColumnSortHandler.prototype._createSortColumns = function _createSortColumns(columnSortSettings) {
            var _this3 = this;

            var colSettings = [];
            if (columnSortSettings) {
                var settings = columnSortSettings.split(',');
                settings.forEach(function (setting) {
                    var sort = setting.split(':');
                    var sortColumn = {
                        id: sort[0],
                        type: _this3._getColumnSortDataType(sort[0]),
                        direction: sort[1]
                    };
                    colSettings.push(sortColumn);
                });
            }
            return colSettings;
        };

        ColumnSortHandler.prototype._createMultiColumnSortCookie = function _createMultiColumnSortCookie() {
            var columnSortSetting = '';
            for (var i = this._sortColumns.length - 1; i >= 0; i--) {
                var column = this._sortColumns[i];
                if (!column.type) {
                    column.type = this._getColumnSortDataType(column.id);
                }

                var setting = columnSortSetting ? column.id + ':' + column.direction + ',' : column.id + ':' + column.direction;

                columnSortSetting = setting + columnSortSetting;
            }
            this._updateColumnSortSetting(columnSortSetting);
        };

        ColumnSortHandler.prototype._applyMultiColumnSort = function _applyMultiColumnSort() {
            for (var i = this._sortColumns.length - 1; i >= 0; i--) {
                var column = this._sortColumns[i];
                if (!column.type) {
                    column.type = this._getColumnSortDataType(column.id);
                }
                var target = this._gridAdvanced.getColIndexById(column.id);
                this._gridAdvanced.sortRows(target, column.type, column.direction);
            }
        };

        ColumnSortHandler.prototype._updateColumnSortSetting = function _updateColumnSortSetting(columnSortSetting) {

            if (columnSortSetting && this._userSettingHandler) {
                this._userSettingHandler.setUserSetting('sortGridColumns', columnSortSetting);
            }
        };

        _createClass(ColumnSortHandler, [{
            key: 'sortColumns',
            get: function get() {
                return this._sortColumns;
            }
        }]);

        return ColumnSortHandler;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/column-sort-handler.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/string-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StringRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _class, _temp;

    var StringRenderer = exports.StringRenderer = (_temp = _class = function (_DefaultRenderer) {
        _inherits(StringRenderer, _DefaultRenderer);

        function StringRenderer(valueFormat, params, widget) {
            _classCallCheck(this, StringRenderer);

            var _this = _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));

            _this._maxLength = _this._limitLength();
            _this.widget = widget;
            return _this;
        }

        StringRenderer.prototype._limitLength = function _limitLength() {
            switch (this._valueFormat) {
                case 'full':
                    return undefined;
                case 'notext':
                    return 0;
                case 'limit10':
                case 'limit20':
                case 'limit40':
                case 'limit80':
                case 'limit128':
                case 'limit256':
                    return Number(this._valueFormat.substring(5, this._valueFormat.length));
                default:
                    return StringRenderer.DEFAULT_MAX_STRING_LENGTH;
            }
        };

        StringRenderer.prototype.toView = function toView(value, imageLink) {
            if (value === undefined) value = this.widget.getProperty('EmptyCellText');
            value = _DefaultRenderer.prototype.toView.call(this, value);
            var truncateLength = this._maxLength;
            if (value && value.length > truncateLength) {
                value = value.substring(0, truncateLength);
                value += truncateLength > 0 ? '...' : '';
            }
            if (imageLink && typeof value === 'string') {
                value = value ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value : '<img style="vertical-align:top" src="' + imageLink + '">';
            }
            return value;
        };

        return StringRenderer;
    }(_defaultRenderer.DefaultRenderer), _class.DEFAULT_MAX_STRING_LENGTH = 40, _temp);
});
//# sourceMappingURL=../../maps/components/renderers/string-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/default-renderer',['exports', 'htmlencode', 'lodash-amd'], function (exports, _htmlencode, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DefaultRenderer = undefined;

    var _htmlencode2 = _interopRequireDefault(_htmlencode);

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DefaultRenderer = exports.DefaultRenderer = function () {
        function DefaultRenderer(valueFormat, params) {
            var encodeValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

            _classCallCheck(this, DefaultRenderer);

            this._valueFormat = valueFormat;
            this._params = params;
            this._encodeValue = encodeValue;
        }

        DefaultRenderer.prototype.toView = function toView(value) {
            var newVal = value;

            if (value === undefined || value === null) {
                newVal = '';
            } else if (typeof value.toString === 'function') {
                newVal = value.toString();
            } else if (_lodashAmd2.default.isObject(value)) {
                newVal = JSON.stringify(value);
            }

            if (this._encodeValue) {
                newVal = _htmlencode2.default.htmlEncode(newVal);
            }

            return newVal;
        };

        return DefaultRenderer;
    }();
});
//# sourceMappingURL=../../maps/components/renderers/default-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/boolean-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.BooleanRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var BooleanRenderer = exports.BooleanRenderer = function (_DefaultRenderer) {
        _inherits(BooleanRenderer, _DefaultRenderer);

        function BooleanRenderer(valueFormat, params) {
            _classCallCheck(this, BooleanRenderer);

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));
        }

        BooleanRenderer.prototype.toView = function toView(value, imageLink) {
            switch (this._valueFormat) {
                case 'text':
                    value = imageLink ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + _DefaultRenderer.prototype.toView.call(this, value) : _DefaultRenderer.prototype.toView.call(this, value);
                    break;
                case 'notext':
                    value = imageLink ? '<img style="vertical-align:top" src="' + imageLink + '">' : '';
                    break;
                case 'checkbox':
                default:
                    value = '<input type="CHECKBOX" ' + (value ? 'checked' : '') + ' disabled="disabled">';
            }
            return value;
        };

        return BooleanRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/boolean-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/datetime-renderer',['exports', './default-renderer', 'moment-jdateformatparser', 'lodash-amd'], function (exports, _defaultRenderer, _momentJdateformatparser, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DatetimeRenderer = undefined;

    var _momentJdateformatparser2 = _interopRequireDefault(_momentJdateformatparser);

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var DatetimeRenderer = exports.DatetimeRenderer = function (_DefaultRenderer) {
        _inherits(DatetimeRenderer, _DefaultRenderer);

        function DatetimeRenderer(valueFormat, params) {
            _classCallCheck(this, DatetimeRenderer);

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));
        }

        DatetimeRenderer.prototype.toView = function toView(value, imageLink) {
            if (_lodashAmd2.default.isNil(value)) {
                value = '---';
            } else if (_lodashAmd2.default.isString(value)) {
                value = value.trim().length === 0 ? '---' : (0, _momentJdateformatparser2.default)(new Date(value)).format(this._valueFormat);
            } else {
                value = this._formatDate(value);
            }
            if (imageLink) {
                value = '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value;
            }
            return value;
        };

        DatetimeRenderer.prototype._formatDate = function _formatDate(value) {
            var m = (0, _momentJdateformatparser2.default)(value);
            var date = void 0;
            var format = this._valueFormat;

            if (format) {
                if (format.substring(0, 9) === 'relative:') {
                    m.fromNow();
                    format = format.replace('relative:', '');
                }
                date = m.formatWithJDF(format);
            } else {
                date = _DefaultRenderer.prototype.toView.call(this, value);
            }
            return date;
        };

        return DatetimeRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/datetime-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/number-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NumberRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var NumberRenderer = exports.NumberRenderer = function (_DefaultRenderer) {
        _inherits(NumberRenderer, _DefaultRenderer);

        function NumberRenderer(valueFormat, params, widget) {
            _classCallCheck(this, NumberRenderer);

            if (valueFormat.length === 0) {
                valueFormat = '0';
            }
            var result = _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));
            result.widget = widget;
            return result;
        }

        NumberRenderer.prototype.toView = function toView(value, imageLink) {
            if (value === undefined) return this.widget.getProperty('EmptyCellText');
            value = parseFloat(value);
            value = this._format(value, this._valueFormat);
            if (imageLink) {
                value = value ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value : '<img style="vertical-align:top" src="' + imageLink + '">';
            }
            return value;
        };

        NumberRenderer.prototype._format = function _format(value, format) {
            if (typeof format !== 'string') {
                return '';
            }

            var hasComma = -1 < format.indexOf(','),
                psplit = format.replace(/[^0-9.]/g, '').split('.');

            var wasNegative = false;
            if (value < 0) {
                wasNegative = true;
                value = -value;
            }

            if (1 < psplit.length) {
                value = value.toFixed(psplit[1].length);
            } else if (2 < psplit.length) {
                throw 'NumberFormatException: invalid format, formats should have no more than 1 period: ' + format;
            } else {
                value = value.toFixed(0);
            }

            var fnum = value.toString();

            if (hasComma) {
                psplit = fnum.split('.');

                var cnum = psplit[0],
                    parr = [],
                    j = cnum.length,
                    m = Math.floor(j / 3),
                    n = cnum.length % 3 || 3;
                for (var i = 0; i < j; i += n) {
                    if (i !== 0) {
                        n = 3;
                    }
                    parr[parr.length] = cnum.substr(i, n);
                    m -= 1;
                }

                fnum = parr.join(',');

                if (psplit[1]) {
                    fnum += '.' + psplit[1];
                }
            }

            var returnedString = format.replace(/[\d,?\.?]+/, fnum);

            if (wasNegative) {
                returnedString = '-' + returnedString;
            }
            return returnedString;
        };

        return NumberRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/number-renderer.js.map

gaRequire.define('tw-grid-advanced/configuration-parser',['exports', './grid-advanced-configuration', '../../components/definitions/style-definition', './logger', 'lodash-amd'], function (exports, _gridAdvancedConfiguration, _styleDefinition, _logger, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ConfigurationParser = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ConfigurationParser = exports.ConfigurationParser = function () {
        function ConfigurationParser() {
            _classCallCheck(this, ConfigurationParser);

            this._gridAdvancedConfiguration = new _gridAdvancedConfiguration.GridAdvancedConfiguration();
        }

        ConfigurationParser.prototype.createStyleDefinitions = function createStyleDefinitions(styles) {
            var styleDefinitions = [];
            var styleNames = _lodashAmd2.default.keys(styles);
            _lodashAmd2.default.map(styleNames, function (styleName) {
                var styleDefinition = new _styleDefinition.StyleDefinition(styleName);
                styleDefinition.createFromConfig(_lodashAmd2.default.get(styles, styleName));
                styleDefinitions.push(styleDefinition);
            });
            return styleDefinitions;
        };

        ConfigurationParser.convertDefaultSelectedRows = function convertDefaultSelectedRows(defaultSelectedRows) {
            var _this = this;

            var selections = [];
            var uniqueNumbers = new Map();
            if (this._validateDefaultSelectedRow(defaultSelectedRows)) {
                var elements = defaultSelectedRows.split(',');
                _lodashAmd2.default.map(elements, function (element) {
                    var index = void 0;
                    if ((index = element.indexOf('-')) > -1) {
                        var endNum = void 0;
                        var startNum = parseInt(element.substring(0, index), 10);
                        if (index + 1 <= element.length) {
                            endNum = parseInt(element.substring(index + 1, element.length), 10);
                        }
                        if (startNum === 0 || endNum === 0) {
                            _logger.Logger.warn('DefaultSelectedRow property value "' + defaultSelectedRows + '" specifies invalid row index "0". Table rows start at index 1');
                        } else {
                            for (var i = startNum; i <= endNum; i++) {
                                _this._addUniqueNumber(defaultSelectedRows, selections, uniqueNumbers, i);
                            }
                        }
                    } else {
                        var j = parseInt(element, 10);
                        _this._addUniqueNumber(defaultSelectedRows, selections, uniqueNumbers, j);
                    }
                });
            }
            return selections;
        };

        ConfigurationParser._validateDefaultSelectedRow = function _validateDefaultSelectedRow(value) {
            if (value && typeof value === 'string') {
                value = value.replace(/\s+/g, '');
                var values = value.split('');
                for (var i = 0; i < values.length; i++) {
                    if (values[i] === '-' || values[i] === ',') {
                        continue;
                    }
                    if (_lodashAmd2.default.isNaN(parseInt(values[i], 10))) {
                        _logger.Logger.warn('Invalid character "' + values[i] + '" found in "DefaultSelectedRow" property value "' + value + '"');
                        return false;
                    }
                }
                return true;
            }
            return false;
        };

        ConfigurationParser._addUniqueNumber = function _addUniqueNumber(defaultSelectedRow, selections, uniqueNumbers, number) {
            if (number > 0) {
                var zeroBasedIndex = number - 1;
                if (!uniqueNumbers.has(zeroBasedIndex)) {
                    selections.push(zeroBasedIndex);
                    uniqueNumbers.set(zeroBasedIndex, zeroBasedIndex);
                }
            } else {
                _logger.Logger.warn('DefaultSelectedRow property value "' + defaultSelectedRow + '" specifies invalid row index "0". Table rows start at index 1');
            }
        };

        _createClass(ConfigurationParser, [{
            key: 'configuration',
            get: function get() {
                return this._gridAdvancedConfiguration;
            }
        }]);

        return ConfigurationParser;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/configuration-parser.js.map

gaRequire.define('tw-grid-advanced/grid-advanced-configuration',['exports', './logger', './column-definition'], function (exports, _logger, _columnDefinition) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GridAdvancedConfiguration = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var GridAdvancedConfiguration = exports.GridAdvancedConfiguration = function () {
        function GridAdvancedConfiguration() {
            _classCallCheck(this, GridAdvancedConfiguration);

            this.TABLE_WRAPPER_STYLE = 'tableWrapperStyle';
            this.TABLE_FOCUS_STYLE = 'tableFocusStyle';
            this.TABLE_HEADER_STYLE = 'tableHeaderStyle';
            this.TABLE_SORTING_STYLE = 'tableSortingStyle';
            this.ROW_BORDER_STYLE = 'rowBorderStyle';
            this.ROW_BACKGROUND_STYLE = 'rowBackgroundStyle';
            this.ROW_ALTERNATE_BACKGROUND_STYLE = 'rowAlternateBackgroundStyle';
            this.ROW_HOVER_STYLE = 'rowHoverStyle';
            this.ROW_SELECTED_STYLE = 'rowSelectedStyle';
            this.PAGINATION_BUTTON_STYLE = 'paginationButtonStyle';
            this.PAGINATION_HOVER_STYLE = 'paginationHoverStyle';
            this.PAGINATION_SELECTED_STYLE = 'paginationSelectedStyle';
            this.CELL_BORDER_STYLE = 'cellBorderStyle';
            this.TOOLTIP_STYLE = 'tooltipStyle';
            this.TOOLBAR_STYLE = 'toolbarStyle';
            this.SORT_ASCENDING_STYLE = 'sortAscendingStyle';
            this.SORT_DESCENDING_STYLE = 'sortDescendingStyle';

            this._defaultSelectedRows = [];
            this._preLoadTreeLevels = 1;
            this._maxRowCacheSize = 10000;
            this._enableColumnSorting = false;
            this._orderedStyleNames = [this.TABLE_WRAPPER_STYLE, this.TABLE_FOCUS_STYLE, this.TABLE_HEADER_STYLE, this.TABLE_SORTING_STYLE, this.ROW_BORDER_STYLE, this.PAGINATION_BUTTON_STYLE, this.CELL_BORDER_STYLE, this.ROW_BACKGROUND_STYLE, this.ROW_ALTERNATE_BACKGROUND_STYLE, this.ROW_SELECTED_STYLE, this.ROW_HOVER_STYLE, this.PAGINATION_SELECTED_STYLE, this.PAGINATION_HOVER_STYLE, this.TOOLTIP_STYLE, this.TOOLBAR_STYLE, this.SORT_ASCENDING_STYLE, this.SORT_DESCENDING_STYLE];
        }

        GridAdvancedConfiguration.prototype.findColumnDefinition = function findColumnDefinition(fieldName) {
            var columnDefMap = this._createColumnDefMap();
            return columnDefMap.get(fieldName);
        };

        GridAdvancedConfiguration.prototype.hasColumnDefinition = function hasColumnDefinition(fieldName) {
            var columnDefMap = this._createColumnDefMap();
            return columnDefMap.has(fieldName);
        };

        GridAdvancedConfiguration.prototype.orderColumnFieldNames = function orderColumnFieldNames() {
            var orderedColumnNames = [];
            if (this._columnDefinitions) {
                orderedColumnNames = new Array(this._columnDefinitions.length);
                for (var i = 0; i < this._columnDefinitions.length; i++) {
                    var index = parseInt(this._columnDefinitions[i].columnIndex, 10);
                    if (index >= 0 && index < this._columnDefinitions.length) {
                        orderedColumnNames[index] = this._columnDefinitions[i].fieldName;
                    }
                }
            }
            return orderedColumnNames;
        };

        GridAdvancedConfiguration.prototype.addColumnDefinition = function addColumnDefinition(fieldName, title, formatter, hidden) {
            if (!this._columnDefinitions) {
                this._columnDefinitions = [];
            }
            var columnDefinition = new _columnDefinition.ColumnDefinition(this._columnDefinitions.length, fieldName, title, formatter);
            columnDefinition.hidden = hidden;
            this._columnDefinitions.push(columnDefinition);
        };

        GridAdvancedConfiguration.prototype._validateColumnDefinitions = function _validateColumnDefinitions(columnDefinitions) {
            if (columnDefinitions) {
                var indexMap = new Map();
                for (var i = 0; i < columnDefinitions.length; i++) {
                    var index = parseInt(columnDefinitions[i].columnIndex, 10);
                    if (index < 0) {
                        _logger.Logger.error('Invalid column target "' + index + '" for field name "' + columnDefinitions[i].fieldName + '". Column target should be a positive integer.');
                    } else if (!indexMap.has(index)) {
                        indexMap.set(index, columnDefinitions[i]);
                    } else {
                        _logger.Logger.error('Duplicate column target "' + index + '" for field name "' + columnDefinitions[i].fieldName + '"');
                    }

                    if (index >= columnDefinitions.length) {
                        _logger.Logger.error('Invalid column target "' + index + '". Total number of specified column definitions is currently "' + columnDefinitions.length + '"');
                    }
                }
            }
        };

        GridAdvancedConfiguration.prototype._createColumnDefMap = function _createColumnDefMap() {
            var fieldNameMap = new Map();
            if (this._columnDefinitions) {
                this._columnDefinitions.forEach(function (columnDef) {
                    fieldNameMap.set(columnDef.fieldName, columnDef);
                });
            }
            return fieldNameMap;
        };

        _createClass(GridAdvancedConfiguration, [{
            key: 'tableId',
            set: function set(tableId) {
                this._tableId = tableId;
            },
            get: function get() {
                return this._tableId;
            }
        }, {
            key: 'paginationSettings',
            set: function set(paginationSettings) {
                this._paginationSettings = paginationSettings;
            },
            get: function get() {
                return this._paginationSettings;
            }
        }, {
            key: 'rowFormatter',
            set: function set(rowFormatter) {
                this._rowFormatter = rowFormatter;
            },
            get: function get() {
                return this._rowFormatter;
            }
        }, {
            key: 'selectedRow',
            set: function set(selectedRow) {
                this._selectedRow = selectedRow;
            },
            get: function get() {
                return this._selectedRow;
            }
        }, {
            key: 'rowDefinition',
            set: function set(rowDefinition) {
                this._rowDefinition = rowDefinition;
            },
            get: function get() {
                return this._rowDefinition;
            }
        }, {
            key: 'columnDefinitions',
            set: function set(columnDefs) {
                this._validateColumnDefinitions(columnDefs);
                this._columnDefinitions = columnDefs;
            },
            get: function get() {
                return this._columnDefinitions;
            }
        }, {
            key: 'styleDefinitions',
            set: function set(styleDefs) {
                this._styleDefinitions = styleDefs;
            },
            get: function get() {
                return this._styleDefinitions;
            }
        }, {
            key: 'orderedStyleNames',
            get: function get() {
                return this._orderedStyleNames;
            }
        }, {
            key: 'headerDefinition',
            set: function set(headerDef) {
                this._headerDefinition = headerDef;
            },
            get: function get() {
                return this._headerDefinition;
            }
        }, {
            key: 'fixedColumnDefinition',
            set: function set(fixedColumnDefinition) {
                this._fixedColumnDefinition = fixedColumnDefinition;
            },
            get: function get() {
                return this._fixedColumnDefinition;
            }
        }, {
            key: 'runtimeDefinition',
            set: function set(runtimeDefinition) {
                this._runtimeDefinition = runtimeDefinition;
            },
            get: function get() {
                return this._runtimeDefinition;
            }
        }, {
            key: 'searchSettings',
            set: function set(searchSettings) {
                this._searchSettings = searchSettings;
            },
            get: function get() {
                return this._searchSettings;
            }
        }, {
            key: 'styles',
            set: function set(styles) {
                this._styles = styles;
            },
            get: function get() {
                return this._styles;
            }
        }, {
            key: 'splitColumnIndex',
            get: function get() {
                return this._splitColumnIndex;
            },
            set: function set(splitColumnIndex) {
                this._splitColumnIndex = splitColumnIndex;
            }
        }, {
            key: 'resetButton',
            get: function get() {
                return this._resetButton;
            },
            set: function set(resetButton) {
                this._resetButton = resetButton;
            }
        }, {
            key: 'multiColumnSortOrder',
            set: function set(multiColumnSortOrder) {
                this._multiColumnSortOrder = multiColumnSortOrder;
            },
            get: function get() {
                return this._multiColumnSortOrder;
            }
        }, {
            key: 'expandAllLoadedLevels',
            set: function set(expandAll) {
                this._expandAllPreLoadedLevels = expandAll;
            },
            get: function get() {
                return this._expandAllPreLoadedLevels;
            }
        }, {
            key: 'includeRowExpansionParents',
            set: function set(includeParents) {
                this._includeRowExpansionParents = includeParents;
            },
            get: function get() {
                return this._includeRowExpansionParents;
            }
        }, {
            key: 'maxRowCacheSize',
            set: function set(cacheSize) {
                this._maxRowCacheSize = cacheSize;
            },
            get: function get() {
                return this._maxRowCacheSize;
            }
        }, {
            key: 'parentIdFieldName',
            set: function set(parentIdFieldName) {
                this._parentIdFieldName = parentIdFieldName;
            },
            get: function get() {
                return this._parentIdFieldName;
            }
        }, {
            key: 'idFieldName',
            set: function set(idFieldName) {
                this._idFieldName = idFieldName;
            },
            get: function get() {
                return this._idFieldName;
            }
        }, {
            key: 'hasChildrenFieldName',
            set: function set(hasChildrenFieldName) {
                this._hasChildrenFieldName = hasChildrenFieldName;
            },
            get: function get() {
                return this._hasChildrenFieldName;
            }
        }, {
            key: 'enableColumnSorting',
            set: function set(enableColumnSorting) {
                this._enableColumnSorting = enableColumnSorting;
            },
            get: function get() {
                return this._enableColumnSorting;
            }
        }, {
            key: 'preserveRowExpansion',
            set: function set(preserveRowExpansion) {
                this._preserveRowExpansion = preserveRowExpansion;
            },
            get: function get() {
                return this._preserveRowExpansion;
            }
        }, {
            key: 'allColumnsHidden',
            get: function get() {
                if (this._columnDefinitions) {
                    for (var i = 0; i < this._columnDefinitions.length; i++) {
                        if (!this._columnDefinitions[i].hidden) {
                            return false;
                        }
                    }
                }
                return true;
            }
        }]);

        return GridAdvancedConfiguration;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/grid-advanced-configuration.js.map

gaRequire.define('tw-grid-advanced/column-definition',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var _class, _temp;

    var ColumnDefinition = exports.ColumnDefinition = (_temp = _class = function () {
        function ColumnDefinition(columnIndex, fieldName, title, columnFormatter) {
            _classCallCheck(this, ColumnDefinition);

            this._columnIndex = columnIndex;
            this._fieldName = fieldName;
            this._columnFormatter = columnFormatter;
            this._title = title;

            this._width = '120px';
            this._autoWidth = true;
            this._textAlignment = 'left';
            this._headerTextAlignment = 'left';
            this._hidden = true;
            if (columnFormatter !== undefined && columnFormatter.valueConverter !== undefined) {
                this._allowsTooltips = ColumnDefinition.DisabledTooltipTypes.indexOf(columnFormatter.valueConverter.constructor.name) === -1;
            }
            this._inLayout = true;
        }

        ColumnDefinition.prototype.render = function render(data, stateData) {
            if (this._columnFormatter) {
                return this._columnFormatter.formatValue(data, stateData);
            }
            return data;
        };

        _createClass(ColumnDefinition, [{
            key: 'columnIndex',
            get: function get() {
                return this._columnIndex;
            },
            set: function set(columnIndex) {
                this._columnIndex = columnIndex;
            }
        }, {
            key: 'fieldName',
            get: function get() {
                return this._fieldName;
            }
        }, {
            key: 'columnFormatter',
            get: function get() {
                return this._columnFormatter;
            }
        }, {
            key: 'title',
            get: function get() {
                return this._title;
            },
            set: function set(title) {
                this._title = title;
            }
        }, {
            key: 'width',
            get: function get() {
                return this._width;
            },
            set: function set(width) {
                this._width = width;
            }
        }, {
            key: 'autoWidth',
            get: function get() {
                return this._autoWidth;
            },
            set: function set(autoWidth) {
                this._autoWidth = autoWidth;
            }
        }, {
            key: 'overflow',
            get: function get() {
                return this._overflow;
            },
            set: function set(overflow) {
                this._overflow = overflow;
            }
        }, {
            key: 'headerTextAlignment',
            get: function get() {
                return this._headerTextAlignment;
            },
            set: function set(textAlignment) {
                this._headerTextAlignment = textAlignment;
            }
        }, {
            key: 'textAlignment',
            get: function get() {
                return this._textAlignment;
            },
            set: function set(textAlignment) {
                this._textAlignment = textAlignment;
            }
        }, {
            key: 'hidden',
            set: function set(hidden) {
                if (typeof hidden === 'boolean') {
                    this._hidden = hidden;
                }
            },
            get: function get() {
                return this._hidden;
            }
        }, {
            key: 'inLayout',
            set: function set(inLayout) {
                if (typeof inLayout === 'boolean') {
                    this._inLayout = inLayout;
                }
            },
            get: function get() {
                return this._inLayout;
            }
        }, {
            key: 'multiColumnOrder',
            get: function get() {
                return this._multiColumnOrder;
            },
            set: function set(multiColumnOrder) {
                this._multiColumnOrder = multiColumnOrder;
            }
        }, {
            key: 'searchDefinition',
            get: function get() {
                return this._searchDefinition;
            },
            set: function set(searchDefinition) {
                this._searchDefinition = searchDefinition;
            }
        }, {
            key: 'description',
            get: function get() {
                return this._description;
            },
            set: function set(description) {
                this._description = description;
            }
        }, {
            key: 'allowsTooltips',
            get: function get() {
                return this._allowsTooltips && this.overflow === 'tooltip';
            }
        }]);

        return ColumnDefinition;
    }(), _class.DisabledTooltipTypes = ['HtmlRenderer', 'ImagelinkRenderer', 'BooleanRenderer'], _temp);
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/column-definition.js.map

gaRequire.define('tw-grid-advanced/../../components/definitions/style-definition',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var StyleDefinition = exports.StyleDefinition = function () {
        function StyleDefinition(displayName) {
            _classCallCheck(this, StyleDefinition);

            this._displayName = displayName;
            this._styles = ['color', 'font-size', 'border-style', 'text-decoration', 'font-style', 'border-width', 'border-color', 'background-color', 'font-weight', 'font-family', 'secondary-background-color'];
        }

        StyleDefinition.prototype.findStyleValue = function findStyleValue(styleName) {
            if (styleName) {
                switch (styleName) {
                    case 'color':
                        return this.color;
                    case 'font-size':
                        return this.fontSize;
                    case 'border-style':
                        return this.borderStyle;
                    case 'text-decoration':
                        return this.textDecoration;
                    case 'font-style':
                        return this.fontStyle;
                    case 'border-width':
                        return this.borderWidth;
                    case 'border-color':
                        return this.borderColor;
                    case 'background-color':
                        return this.backgroundColor;
                    case 'secondary-background-color':
                        return this.secondaryBackgroundColor;
                    case 'font-weight':
                        return this.fontWeight;
                    case 'font-family':
                        return this.fontFamily;
                    default:
                        console.warn('Unsupported style name "' + styleName + '"');

                }
            }
            return null;
        };

        StyleDefinition.prototype.createFromConfig = function createFromConfig(styleConfig) {
            if (styleConfig) {
                this.image = styleConfig.image ? styleConfig.image : '';
                this.backgroundColor = styleConfig.backgroundColor ? styleConfig.backgroundColor : '';
                if (styleConfig.fontSize) {
                    this.fontSize = styleConfig.fontSize;
                } else if (styleConfig.textSize) {
                    this.fontSize = this._getTextSize(styleConfig.textSize);
                    if (this.fontSize === '3xl') {
                        this.fontSize = this.fontSize.replace('3xl', '22px');
                    }
                } else {
                    this.fontSize = '';
                }

                if (styleConfig.borderStyle) {
                    this.borderStyle = styleConfig.borderStyle;
                } else if (styleConfig.lineStyle) {
                    this.borderStyle = styleConfig.lineStyle;
                } else {
                    this.borderStyle = '';
                }

                if (styleConfig.textDecoration) {
                    this.textDecoration = styleConfig.textDecoration;
                } else if (styleConfig.fontEmphasisUnderline) {
                    this.textDecoration = 'underline';
                } else {
                    this.textDecoration = '';
                }

                if (styleConfig.fontStyle) {
                    this.fontStyle = styleConfig.fontStyle;
                } else if (styleConfig.fontEmphasisItalic) {
                    this.fontStyle = 'italic';
                } else {
                    this.fontStyle = '';
                }

                if (styleConfig.borderWidth) {
                    this.borderWidth = styleConfig.borderWidth;
                } else if (styleConfig.lineThickness) {
                    this.borderWidth = styleConfig.lineThickness + 'px';
                } else {
                    this.borderWidth = '';
                }

                this.borderColor = styleConfig.lineColor ? styleConfig.lineColor : '';
                this.color = styleConfig.foregroundColor ? styleConfig.foregroundColor : '';

                if (styleConfig.fontWeight) {
                    this.fontWeight = styleConfig.fontWeight;
                } else if (styleConfig.fontEmphasisBold) {
                    this.fontWeight = 'bold';
                } else {
                    this.fontWeight = '';
                }
                this.fontFamily = styleConfig.fontFamily ? styleConfig.fontFamily : '';
                this.secondaryBackgroundColor = styleConfig.secondaryBackgroundColor ? styleConfig.secondaryBackgroundColor : '';
            }
        };

        StyleDefinition.prototype._getTextSize = function _getTextSize(textSize) {
            switch (textSize) {
                case 'xsmall':
                    return '9px';
                case 'small':
                    return '10px';
                case 'normal':
                    return '11px';
                case 'large':
                    return '12px';
                case 'xlarge':
                    return '14px';
                case 'xxl':
                    return '16px';
                case '2xl':
                    return '18px';
                default:
                    return textSize;
            }
        };

        StyleDefinition.prototype.getBackgroundStyle = function getBackgroundStyle(important) {
            var style = '';
            var importantStyle = important ? '!important' : '';
            if (this.backgroundColor.length === 0 && this.secondaryBackgroundColor.length === 0) {
                style = '-ms-filter: progid:DXImageTransform.Microsoft.gradient(enabled=false);' + 'filter:none;';
            } else if (this.secondaryBackgroundColor.length === 0) {
                style += 'background: ' + this.backgroundColor + ' ' + importantStyle + '; filter: none;';
            } else if (this.backgroundColor.length === 0) {
                style += 'background: ' + this.secondaryBackgroundColor + ' ' + importantStyle + '; filter: none;';
            } else if (this.backgroundColor.length > 0 && this.secondaryBackgroundColor.length > 0) {
                style += 'background: ' + this.backgroundColor + ';' + 'background: -moz-linear-gradient(top, ' + this.backgroundColor + ' 0%, ' + this.secondaryBackgroundColor + ' 100%) ' + importantStyle + '; background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,' + this.backgroundColor + '), color-stop(100%,' + this.secondaryBackgroundColor + ')) ' + importantStyle + ';' + 'background: -webkit-linear-gradient(top, ' + this.backgroundColor + ' 0%,' + this.secondaryBackgroundColor + ' 100%) ' + importantStyle + ';' + 'background: -o-linear-gradient(top, ' + this.backgroundColor + ' 0%,' + this.secondaryBackgroundColor + ' 100%) ' + importantStyle + ';' + 'background: -ms-linear-gradient(top, ' + this.backgroundColor + ' 0%,' + this.secondaryBackgroundColor + ' 100%) ' + importantStyle + ';' + 'background: linear-gradient(top, ' + this.backgroundColor + ' 0%,' + this.secondaryBackgroundColor + ' 100%) ' + importantStyle + ';' + 'filter: progid:DXImageTransform.Microsoft.gradient( startColorstr=\'' + this.backgroundColor + '\', endColorstr=\'' + this.secondaryBackgroundColor + '\',GradientType=0 )' + importantStyle + ';';
            }
            if (this.image && this.image.length > 0) {
                style += 'background-image: ' + this.image + ';';
            }
            return style;
        };

        StyleDefinition.prototype.getBorderStyle = function getBorderStyle(important) {
            var style = '';
            var importantStyle = important ? '!important' : '';
            var borderWidth = this.borderWidth.length !== 0 && !isNaN(parseInt(this.borderWidth, 10)) ? parseInt(this.borderWidth, 10) : 0;
            if (this.borderColor.length !== 0 && borderWidth > 0) {
                if (this.borderWidth.length !== 0) {
                    style += 'border-width:' + this.borderWidth + '' + importantStyle + ';';
                }
                if (this.borderColor.length > 0) {
                    style += 'border-color:' + this.borderColor + '' + importantStyle + ';';
                }
                if (this.borderStyle.length > 0) {
                    style += 'border-style:' + this.borderStyle + '' + importantStyle + ';';
                }
            } else {
                style += 'border: none ' + importantStyle + ';';
            }
            return style;
        };

        StyleDefinition.prototype.getFontStyle = function getFontStyle(important) {
            var style = '';
            var importantStyle = important ? '!important' : '';
            if (this.color && this.color.length > 0) {
                style += ' color : ' + this.color + '' + importantStyle + '; ';
            }

            if (this.fontWeight && this.fontWeight.length > 0) {
                style += ' font-weight: ' + this.fontWeight + '' + importantStyle + ';';
            }

            if (this.fontStyle && this.fontStyle.length > 0) {
                style += ' font-style: ' + this.fontStyle + '' + importantStyle + ';';
            } else {
                style += ' font-style: normal' + importantStyle + ';';
            }

            if (this.textDecoration) {
                style += ' text-decoration: ' + this.textDecoration + '' + importantStyle + ';';
            } else {
                style += ' text-decoration: none' + importantStyle + ';';
            }

            if (this.fontFamily && this.fontFamily.length > 0) {
                style += ' font-family: ' + this.fontFamily + '' + importantStyle + ';';
            }

            if (this.fontSize && this.fontSize.length > 0) {
                style += ' font-size: ' + this.fontSize + '' + importantStyle + ';';
            }

            return style;
        };

        StyleDefinition.cascadeCellStyles = function cascadeCellStyles(rowStyle, colStyle) {
            var style = '';

            if (colStyle && colStyle !== '') {
                (function () {
                    var colStyleMap = StyleDefinition.createStyleMap(colStyle);
                    if (rowStyle && rowStyle !== '') {
                        (function () {
                            var rowStyleMap = StyleDefinition.createStyleMap(rowStyle);
                            colStyleMap.forEach(function (value, key) {
                                if (value) {
                                    value.forEach(function (v) {
                                        style += key + ':' + v + ';';
                                    });
                                }
                            });

                            rowStyleMap.forEach(function (value, key) {
                                if (!colStyleMap.has(key)) {
                                    var values = rowStyleMap.get(key);
                                    values.forEach(function (v) {
                                        style += key + ':' + v + ';';
                                    });
                                }
                            });
                        })();
                    } else {
                        style = colStyle;
                    }
                })();
            } else if (rowStyle && rowStyle !== '') {
                style = rowStyle;
            }
            return style;
        };

        StyleDefinition.createStyleMap = function createStyleMap(styleString) {
            var styleElements = styleString.split(';');
            var styles = new Map();
            styleElements.forEach(function (style) {
                var index = style.indexOf(':');
                var name = style.substring(0, index);
                var value = style.substring(index + 1, style.length);
                value = value ? value.trim() : undefined;
                var key = name.trim();
                if (value && value !== '') {
                    if (styles.has(key)) {
                        styles.get(key).push(value);
                    } else {
                        var values = [];
                        values.push(value);
                        styles.set(key, values);
                    }
                }
            });
            return styles;
        };

        _createClass(StyleDefinition, [{
            key: 'styles',
            get: function get() {
                return this._styles;
            }
        }, {
            key: 'displayName',
            get: function get() {
                return this._displayName;
            }
        }, {
            key: 'image',
            set: function set(image) {
                this._image = image;
            },
            get: function get() {
                return this._image;
            }
        }, {
            key: 'color',
            set: function set(color) {
                this._color = color;
            },
            get: function get() {
                return this._color;
            }
        }, {
            key: 'fontSize',
            get: function get() {
                return this._fontSize;
            },
            set: function set(value) {
                this._fontSize = value;
            }
        }, {
            key: 'borderStyle',
            get: function get() {
                return this._borderStyle;
            },
            set: function set(value) {
                this._borderStyle = value;
            }
        }, {
            key: 'textDecoration',
            get: function get() {
                return this._textDecoration;
            },
            set: function set(value) {
                this._textDecoration = value;
            }
        }, {
            key: 'fontStyle',
            get: function get() {
                return this._fontStyle;
            },
            set: function set(value) {
                this._fontStyle = value;
            }
        }, {
            key: 'borderWidth',
            get: function get() {
                return this._borderWidth;
            },
            set: function set(value) {
                this._borderWidth = value;
            }
        }, {
            key: 'borderColor',
            get: function get() {
                return this._borderColor;
            },
            set: function set(value) {
                this._borderColor = value;
            }
        }, {
            key: 'backgroundColor',
            get: function get() {
                return this._backgroundColor;
            },
            set: function set(value) {
                this._backgroundColor = value;
            }
        }, {
            key: 'secondaryBackgroundColor',
            get: function get() {
                return this._secondaryBackgroundColor;
            },
            set: function set(value) {
                this._secondaryBackgroundColor = value;
            }
        }, {
            key: 'fontWeight',
            get: function get() {
                return this._fontWeight;
            },
            set: function set(value) {
                this._fontWeight = value;
            }
        }, {
            key: 'fontFamily',
            get: function get() {
                return this._fontFamily;
            },
            set: function set(value) {
                this._fontFamily = value;
            }
        }]);

        return StyleDefinition;
    }();
});
//# sourceMappingURL=../../maps/components/definitions/style-definition.js.map

gaRequire.define('tw-grid-advanced/tooltip/default-tooltip',['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DefaultTooltip = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DefaultTooltip = exports.DefaultTooltip = function () {
        function DefaultTooltip() {
            _classCallCheck(this, DefaultTooltip);
        }

        DefaultTooltip.setTooltip = function setTooltip(tooltip, element) {
            (0, _jquery2.default)(element).attr('title', tooltip);
        };

        return DefaultTooltip;
    }();
});
//# sourceMappingURL=../../../maps/advanced-widgets/grid-advanced/tooltip/default-tooltip.js.map

gaRequire.define('tw-grid-advanced/dhtmlx-table-data',['exports', 'lodash-amd', './logger', './grid-row'], function (exports, _lodashAmd, _logger, _gridRow) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DhtmlxTableData = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var TWX_IS_SELECTED = '_isSelected';

    var DhtmlxTableData = exports.DhtmlxTableData = function () {
        function DhtmlxTableData(rows, cfg, localizationUtil) {
            _classCallCheck(this, DhtmlxTableData);

            this._privateFieldNameMap = new Map();
            this._localizationUtil = localizationUtil;
            this._columns = [];
            this._allColumns = [];
            this._headers = '';
            this._cfg = cfg;
            this._rowIdMap = new Map();
            this._data = this.orderData(rows);
        }

        DhtmlxTableData.prototype._createPrivateFieldNameMap = function _createPrivateFieldNameMap() {
            if (this._privateFieldNameMap.size === 0) {
                this._privateFieldNameMap.set(TWX_IS_SELECTED, true);
            }
        };

        DhtmlxTableData.prototype._isPrivateColumn = function _isPrivateColumn(fieldName) {
            this._createPrivateFieldNameMap();
            return this._privateFieldNameMap.has(fieldName);
        };

        DhtmlxTableData.prototype._hasPrivateColumn = function _hasPrivateColumn(object, fieldName) {
            this._createPrivateFieldNameMap();
            var hasPrivate = false;
            if (this._isPrivateColumn(fieldName)) {
                hasPrivate = _lodashAmd2.default.has(object, fieldName);
            } else {
                hasPrivate = false;
            }
            return hasPrivate;
        };

        DhtmlxTableData.prototype._removePrivateColumns = function _removePrivateColumns(object) {
            var _this = this;

            var updated = object;
            this._createPrivateFieldNameMap();
            this._privateFieldNameMap.forEach(function (value, key) {
                if (_lodashAmd2.default.has(updated, key)) {
                    updated = _lodashAmd2.default.omit(updated, key);
                }
            });

            if (this._cfg && this._cfg.columnDefinitions && this._cfg.columnDefinitions.length > 0) {
                var keys = _lodashAmd2.default.keys(object);
                keys.forEach(function (key) {
                    if (_this._cfg) {
                        if (!_this._cfg.hasColumnDefinition(key)) {
                            updated = _lodashAmd2.default.omit(updated, key);
                        }
                    }
                });
            }
            return updated;
        };

        DhtmlxTableData.prototype.orderData = function orderData(data, parentId) {
            var _this2 = this;

            var expandRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var updatedRows = [];
            var newData = [];
            var tree = {};
            var orderedColumns = void 0;

            data.forEach(function (row, index) {
                var rowId = _this2._createRowId(parentId, row, index);
                var myParentId = _lodashAmd2.default.get(row, _this2._cfg.parentIdFieldName);
                var hasChildren = _this2._hasChildren(row);

                row = _this2._removePrivateColumns(row);
                var rawValues = _lodashAmd2.default.values(row);
                var values = _this2._removeNotInLayoutColumns(_this2._cfg, row);
                if (index === 0) {
                    _this2._createHeaders(_lodashAmd2.default.keys(row));
                    orderedColumns = _this2._determineColumnOrder();
                }
                if (_this2._cfg.expandAllLoadedLevels === true && hasChildren) {
                    expandRows = true;
                }
                _this2._setNodeIcon(orderedColumns[0], values, hasChildren);

                var gridRow = new _gridRow.GridRow(rowId, myParentId, values, rawValues, hasChildren, expandRows);
                tree[rowId] = gridRow;
                newData[index] = gridRow;
                _this2._rowIdMap.set(gridRow.id, gridRow);
            });
            if (data && data.length === 0 && this._cfg) {
                this._createHeaders(this._cfg.orderColumnFieldNames());
            }

            newData.forEach(function (row) {
                var myParentId = row.parent;
                if (myParentId && myParentId !== '' && tree[myParentId]) {
                    tree[myParentId].rows.push(row);
                    tree[myParentId].childrenLoaded = true;
                } else {
                    updatedRows.push(row);
                }
            });

            if (parentId && this._rowIdMap.has(parentId)) {
                var gridRow = this._rowIdMap.get(parentId);
                gridRow.rows = updatedRows;
            }
            return {
                parent: parentId,
                rows: updatedRows
            };
        };

        DhtmlxTableData.prototype._hasChildren = function _hasChildren(row) {
            var value = _lodashAmd2.default.get(row, this._cfg.hasChildrenFieldName);
            return value && value != '0' && value != '0.0' && value != 'undefined' && value !== '' && value != 'false';
        };

        DhtmlxTableData.prototype._createRowId = function _createRowId(parentId, row, index) {
            var rowId = _lodashAmd2.default.get(row, this._cfg.idFieldName);
            if (!rowId) {
                rowId = index + 1 + '';
                if (parentId) {
                    rowId = parentId + '_' + rowId;
                }
            }
            if (rowId === '0') {
                _logger.Logger.error('Cannot have an id of zero');
            }
            return rowId;
        };

        DhtmlxTableData.prototype._createHeaders = function _createHeaders(keys) {
            var _this3 = this;

            this._headers = '';
            this._allColumns = [];
            this._columns = [];
            keys.forEach(function (column) {
                if (_this3._cfg) {
                    if (!_this3._cfg.hasColumnDefinition(column)) {
                        _this3._cfg.addColumnDefinition(column, column, undefined, false);
                    }
                    var columnDef = _this3._cfg.findColumnDefinition(column);
                    _this3._allColumns.push(column);
                    if (columnDef && columnDef.inLayout) {
                        _this3._columns.push(column);
                        var title = columnDef.title ? columnDef.title : column;
                        title = _this3._cfg.headerDefinition ? _this3._cfg.headerDefinition.formatTitle(title) : title;
                        if (_this3._localizationUtil) {
                            title = _this3._localizationUtil(title);
                        }
                        _this3._headers += _this3._headers.length === 0 ? title : ',' + title;
                    }
                }
            });
        };

        DhtmlxTableData.prototype._removeNotInLayoutColumns = function _removeNotInLayoutColumns(cfg, row) {
            var myRow = _lodashAmd2.default.cloneDeep(row);
            if (cfg) {
                (function () {
                    var orderedColumns = [];
                    if (cfg.columnDefinitions) {
                        orderedColumns = new Array(cfg.columnDefinitions.length);
                        for (var i = 0; i < cfg.columnDefinitions.length; i++) {
                            var index = parseInt(cfg.columnDefinitions[i].columnIndex, 10);
                            if (index >= 0 && index < cfg.columnDefinitions.length) {
                                orderedColumns[index] = cfg.columnDefinitions[i];
                            }
                            if (!cfg.columnDefinitions[i].inLayout) {
                                cfg.columnDefinitions[i].columnIndex = -1;
                                myRow = _lodashAmd2.default.omit(myRow, cfg.columnDefinitions[i].fieldName);
                            }
                        }
                    }

                    orderedColumns.forEach(function (columnDef, index) {
                        if (!columnDef.inLayout) {
                            orderedColumns.splice(index, 1);
                        }
                    });

                    orderedColumns.forEach(function (columnDef, index) {
                        columnDef.columnIndex = index;
                    });
                })();
            }
            return _lodashAmd2.default.values(myRow);
        };

        DhtmlxTableData.prototype.getRowById = function getRowById(rowId) {
            return this._rowIdMap.get(rowId);
        };

        DhtmlxTableData.prototype.removeRowById = function removeRowById(rowId) {
            this._rowIdMap.delete(rowId);
        };

        DhtmlxTableData.prototype._determineColumnOrder = function _determineColumnOrder(cookieConfig) {
            var _this4 = this;

            var myColumns = _lodashAmd2.default.cloneDeep(this._columns);

            if (cookieConfig) {
                cookieConfig.columnOrder.forEach(function (columnIndex, toIndex) {
                    var columnId = _this4._columns[columnIndex];
                    _this4._moveColumns(columnId, toIndex, myColumns);
                });
            } else if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDef) {
                    if (columnDef.inLayout) {
                        _this4._moveColumns(columnDef.fieldName, columnDef.columnIndex, myColumns);
                    }
                });
            }
            return myColumns;
        };

        DhtmlxTableData.prototype._moveColumns = function _moveColumns(columnId, toIndex, myColumns) {
            var currentIndex = _lodashAmd2.default.findIndex(myColumns, function (column) {
                return column === columnId;
            });

            if (currentIndex > -1 && toIndex !== currentIndex) {
                var item = myColumns.splice(currentIndex, 1);
                if (toIndex > currentIndex) {
                    myColumns.splice(toIndex - 1, 0, item[0]);
                } else {
                    myColumns.splice(toIndex, 0, item[0]);
                }
            }
        };

        DhtmlxTableData.prototype.createColumnTypes = function createColumnTypes(isTreeGrid) {
            var types = '';
            var columns = this._determineColumnOrder();
            if (this._cfg && this._cfg.columnDefinitions) {
                this.columns.forEach(function (column, index) {
                    if (column === columns[0] && isTreeGrid) {
                        types += types.length === 0 ? 'tree' : ',tree';
                    } else {
                        types += types.length === 0 ? 'ro' : ',ro';
                    }
                });
            }
            return types;
        };

        DhtmlxTableData.prototype._setNodeIcon = function _setNodeIcon(treeColumn, values, hasChildren) {
            var columnIndex = _lodashAmd2.default.findIndex(this._columns, function (columnName) {
                return columnName === treeColumn;
            });
            if (hasChildren) {
                values[columnIndex] = { value: values[columnIndex], image: 'folder.gif' };
            } else {
                values[columnIndex] = { value: values[columnIndex], image: 'blank.gif' };
            }
        };

        _createClass(DhtmlxTableData, [{
            key: 'headers',
            get: function get() {
                return this._headers;
            }
        }, {
            key: 'columns',
            get: function get() {
                return this._columns;
            }
        }, {
            key: 'allColumns',
            get: function get() {
                return this._allColumns;
            }
        }, {
            key: 'columnIds',
            get: function get() {
                var columnIds = '';
                if (this._columns) {
                    this._columns.forEach(function (column) {
                        columnIds += columnIds.length === 0 ? column : ',' + column;
                    });
                }
                return columnIds;
            }
        }, {
            key: 'data',
            get: function get() {
                return this._data;
            }
        }]);

        return DhtmlxTableData;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/dhtmlx-table-data.js.map

gaRequire.define('tw-grid-advanced/grid-row',['exports', '../../components/renderers/html-renderer', 'lodash-amd'], function (exports, _htmlRenderer, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GridRow = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var GridRow = exports.GridRow = function () {
        function GridRow(rowId, parentId, values, rawValues, hasChildren) {
            var expandRow = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

            _classCallCheck(this, GridRow);

            this._id = rowId;
            this._parent = parentId;
            this._rawData = rawValues;
            this._data = values.map(function (value) {
                if (_lodashAmd2.default.isString(value)) {
                    value = _htmlRenderer.HtmlRenderer.sanitize(value);
                }
                return value;
            });
            this._hasChildren = hasChildren;
            this._xmlkids = hasChildren ? '1' : '';

            this._isFormatted = false;
            this._childrenLoaded = false;
            this._isExpanded = false;
            this._rows = [];
            this._open = expandRow;
        }

        _createClass(GridRow, [{
            key: 'id',
            get: function get() {
                return this._id;
            }
        }, {
            key: 'parent',
            get: function get() {
                return this._parent;
            }
        }, {
            key: 'hasChildren',
            get: function get() {
                return this._hasChildren;
            }
        }, {
            key: 'open',
            get: function get() {
                return this._open && this._rows.length > 0;
            }
        }, {
            key: 'rows',
            get: function get() {
                return this._rows;
            },
            set: function set(rows) {
                this._rows = rows;
            }
        }, {
            key: 'xmlkids',
            get: function get() {
                return this._xmlkids;
            }
        }, {
            key: 'childrenLoaded',
            set: function set(loaded) {
                this._childrenLoaded = loaded;
            },
            get: function get() {
                return this._childrenLoaded;
            }
        }, {
            key: 'isFormatted',
            get: function get() {
                return this._isFormatted;
            },
            set: function set(isFormatted) {
                this._isFormatted = isFormatted;
            }
        }, {
            key: 'data',
            get: function get() {
                return this._data;
            }
        }, {
            key: 'rawData',
            get: function get() {
                return this._rawData;
            }
        }, {
            key: 'isExpanded',
            get: function get() {
                return this._isExpanded;
            },
            set: function set(isExpanded) {
                this._isExpanded = isExpanded;
            }
        }]);

        return GridRow;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/grid-row.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/html-renderer',['exports', 'html-css-sanitizer', './default-renderer', 'htmlencode'], function (exports, _htmlCssSanitizer, _defaultRenderer, _htmlencode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HtmlRenderer = undefined;

    var _htmlCssSanitizer2 = _interopRequireDefault(_htmlCssSanitizer);

    var _htmlencode2 = _interopRequireDefault(_htmlencode);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var HtmlRenderer = exports.HtmlRenderer = function (_DefaultRenderer) {
        _inherits(HtmlRenderer, _DefaultRenderer);

        function HtmlRenderer(valueFormat, params) {
            _classCallCheck(this, HtmlRenderer);

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params, valueFormat === 'raw'));
        }

        HtmlRenderer.prototype.toView = function toView(value) {
            var valString = _DefaultRenderer.prototype.toView.call(this, value);
            switch (this._valueFormat) {
                case 'raw':
                    break;
                case 'unsanitized':
                    break;
                case 'format':
                default:
                    valString = HtmlRenderer.sanitize(valString);
            }
            return valString;
        };

        HtmlRenderer.sanitize = function sanitize(html) {
            return _htmlCssSanitizer2.default.sanitize(_htmlencode2.default.htmlDecode(html), function (u) {
                return u;
            }, function (id) {
                return id;
            });
        };

        return HtmlRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/html-renderer.js.map

gaRequire.define('tw-grid-advanced/events/register-event',['exports', '../logger'], function (exports, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RegisterEvent = RegisterEvent;
    function RegisterEvent(eventName) {
        return function (target) {
            target.prototype._registeredEvents = target.prototype._registeredEvents || {};
            target.prototype._registeredEvents[eventName] = {
                id: undefined,
                callback: undefined
            };

            Object.defineProperty(target.prototype, eventName, {
                get: function get() {
                    return this._registeredEvents[eventName].callback;
                },
                set: function set(eventCallback) {
                    if (this._gridAdvanced === undefined) {
                        _logger.Logger.warn('Attempting to add "' + eventName + '" event to uninitialized grid');
                        return;
                    }
                    this._registeredEvents[eventName].callback = eventCallback;

                    if (this._registeredEvents[eventName].id !== undefined) {
                        this._gridAdvanced.detachEvent(this._registeredEvents[eventName].id);
                    }

                    if (this._registeredEvents[eventName].callback === undefined) {
                        this._gridAdvanced.detachEvent(this._registeredEvents[eventName].id);
                        this._registeredEvents[eventName].id = undefined;
                        return;
                    }

                    this._registeredEvents[eventName].id = this._gridAdvanced.attachEvent(eventName, this._registeredEvents[eventName].callback);
                }
            });
        };
    }
});
//# sourceMappingURL=../../../maps/advanced-widgets/grid-advanced/events/register-event.js.map

gaRequire.define('tw-grid-advanced/performance-monitor',['exports', './logger'], function (exports, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.PerformanceMonitor = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var PerformanceMonitor = exports.PerformanceMonitor = function () {
        function PerformanceMonitor(enable) {
            _classCallCheck(this, PerformanceMonitor);

            this._performanceMetricsEnabled = enable;
            if (this._performanceMetricsEnabled) {
                this._startTimeMetrics = new Map();
                this._endTimeMetrics = new Map();
            }
        }

        PerformanceMonitor.prototype.startTime = function startTime(method) {
            if (this._performanceMetricsEnabled) {
                var startTime = new Date().getTime();
                this._startTimeMetrics.set(method, startTime);
            }
        };

        PerformanceMonitor.prototype.endTime = function endTime(method) {
            if (this._performanceMetricsEnabled) {
                var endTime = new Date().getTime();
                this._endTimeMetrics.set(method, endTime);
                this.duration(method);
            }
        };

        PerformanceMonitor.prototype.duration = function duration(method) {
            if (this._performanceMetricsEnabled) {
                _logger.Logger.info('DURATION "' + method + '" [' + (this._endTimeMetrics.get(method) - this._startTimeMetrics.get(method)) + 'ms]');
            }
        };

        return PerformanceMonitor;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/performance-monitor.js.map

gaRequire.define('tw-grid-advanced/user-setting-handler',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.UserSettingHandler = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var UserSettingHandler = exports.UserSettingHandler = function () {
        function UserSettingHandler(cookiePersistenceEnabled, username, version, gridId) {
            _classCallCheck(this, UserSettingHandler);

            this._cookiePersistenceEnabled = cookiePersistenceEnabled;
            this._userCookie = username + '_' + gridId + '_' + version;
            this._gridConfigCookie = 'gridSettings' + this._userCookie;
            this._splitConfigCookie = 'splitGridColumn_' + this._userCookie;
            this._columnSortConfigCookie = 'sortGridColumns_' + this._userCookie;
            this._gridOpenConfigCookie = 'gridOpen' + this._userCookie;
            this._expirationDate = new Date();
            this._expirationDate.setFullYear(this._expirationDate.getFullYear() + 1);
        }

        UserSettingHandler.prototype.hasUserSetting = function hasUserSetting(userSetting) {
            var hasUserSetting = false;
            switch (userSetting) {
                case 'gridSettings':
                    hasUserSetting = this._cookiePersistenceEnabled ? document.cookie.indexOf(this._gridConfigCookie) > -1 : false;
                    break;
                case 'sortGridColumns':
                    hasUserSetting = this._cookiePersistenceEnabled ? document.cookie.indexOf(this._columnSortConfigCookie) > -1 : false;
                    break;
                case 'splitGridColumn':
                    hasUserSetting = this._cookiePersistenceEnabled ? document.cookie.indexOf(this._splitConfigCookie) > -1 : false;
                    break;
                case 'gridOpen':
                    hasUserSetting = this._cookiePersistenceEnabled ? document.cookie.indexOf(this._gridOpenConfigCookie) > -1 : false;
                    break;
                default:
                    hasUserSetting = false;
            }
            return hasUserSetting;
        };

        UserSettingHandler.prototype.getCookies = function getCookies() {
            return document.cookie;
        };

        UserSettingHandler.prototype.setUserSetting = function setUserSetting(settingName, value) {
            switch (settingName) {
                case 'gridSettings':
                    this._gridConfigValue = value;
                    break;
                case 'gridOpen':
                    this._gridOpenConfigValue = value;
                    break;
                case 'sortGridColumns':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._columnSortConfigCookie + '=' + value + '; expires=' + this._expirationDate.toUTCString();
                    }
                    this._columnSortConfigValue = value;
                    break;
                case 'splitGridColumn':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._splitConfigCookie + '=' + value + '; expires=' + this._expirationDate.toUTCString();
                    }
                    this._splitConfigValue = value;
                    break;
                default:
            }
        };

        UserSettingHandler.prototype.resetUserSetting = function resetUserSetting(settingName) {
            switch (settingName) {
                case 'gridSettings':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._gridConfigCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    } else {
                        this._gridConfigValue = undefined;
                    }
                    break;
                case 'gridOpen':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._gridOpenConfigCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    } else {
                        this._gridOpenConfigValue = undefined;
                    }
                    break;
                case 'sortGridColumns':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._columnSortConfigCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    } else {
                        this._columnSortConfigValue = undefined;
                    }
                    break;
                case 'splitGridColumn':
                    if (this._cookiePersistenceEnabled) {
                        document.cookie = this._splitConfigCookie + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
                    } else {
                        this._splitConfigValue = undefined;
                    }
                    break;
                default:
            }
        };

        UserSettingHandler.prototype.readSetting = function readSetting(settingName) {
            var setting = void 0;
            switch (settingName) {
                case 'gridSettings':
                    setting = this._cookiePersistenceEnabled ? this._getGridSettingsCookie() : this._gridConfigValue;
                    break;
                case 'gridOpen':
                    setting = this._cookiePersistenceEnabled ? this._getGridOpenSettingsCookie() : this._gridOpenConfigValue;
                    break;
                case 'splitGridColumn':
                    setting = this._cookiePersistenceEnabled ? this._getSplitIndexFromCookie() : this._splitConfigValue;
                    break;
                case 'sortGridColumns':
                    setting = this._cookiePersistenceEnabled ? this._getColumnSortConfigFromCookie() : this._columnSortConfigValue;
                    break;
                default:
                    return setting;
            }
            return setting;
        };

        UserSettingHandler.prototype._getGridSettingsCookie = function _getGridSettingsCookie() {
            var cookieConfig = void 0;
            var name = this._gridConfigCookie + '=';
            var cookies = this.getCookies().split(';');
            var settings = void 0;
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    settings = cookie.substring(name.length, cookie.length).split('|');
                }
            }
            if (settings) {
                cookieConfig = {
                    columnWidths: settings[0] ? _lodashAmd2.default.map(settings[0].split('-'), function (v) {
                        return parseInt(v, 10);
                    }) : [],
                    columnOrder: settings[3] ? _lodashAmd2.default.map(settings[3].split('-'), function (v) {
                        return parseInt(v, 10);
                    }) : [],
                    columnVisibility: settings[4] ? _lodashAmd2.default.map(settings[4].split('-'), function (v) {
                        return parseInt(v, 10);
                    }) : []
                };
            }
            return cookieConfig;
        };

        UserSettingHandler.prototype._getGridOpenSettingsCookie = function _getGridOpenSettingsCookie() {
            var name = this._gridOpenConfigCookie + '=';
            var cookies = this.getCookies().split(';');
            var settings = void 0;
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    settings = cookie.substring(name.length, cookie.length);
                }
            }
            return settings;
        };

        UserSettingHandler.prototype._getSplitIndexFromCookie = function _getSplitIndexFromCookie() {
            var name = this._splitConfigCookie + '=';
            var cookies = this.getCookies().split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    var index = cookie.substring(name.length, cookie.length);
                    return parseInt(index, 10);
                }
            }
            return -1;
        };

        UserSettingHandler.prototype._getColumnSortConfigFromCookie = function _getColumnSortConfigFromCookie() {
            var name = this._columnSortConfigCookie + '=';
            var cookies = this.getCookies().split(';');
            var sortOrderCookie = void 0;
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];
                while (cookie.charAt(0) === ' ') {
                    cookie = cookie.substring(1);
                }
                if (cookie.indexOf(name) === 0) {
                    sortOrderCookie = cookie.substring(name.length, cookie.length);
                }
            }
            return sortOrderCookie;
        };

        _createClass(UserSettingHandler, [{
            key: 'cookiePersistenceEnabled',
            get: function get() {
                return this._cookiePersistenceEnabled;
            }
        }, {
            key: 'userCookie',
            get: function get() {
                return this._userCookie;
            }
        }]);

        return UserSettingHandler;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/user-setting-handler.js.map

gaRequire.define('tw-grid-advanced/child-grid-handler',['exports', 'jquery', './logger', './performance-monitor'], function (exports, _jquery, _logger, _performanceMonitor) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ChildGridHandler = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _SPINNER_ICON = '../Common/extensions/grid-advanced_ExtensionPackage/ui/gridadvanced/imgs/spinner.gif';

    var ChildGridHandler = exports.ChildGridHandler = function () {
        function ChildGridHandler(gridId, gridAdvanced, dhtmlxTableData, serviceInvoker, configuration) {
            var callback = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

            _classCallCheck(this, ChildGridHandler);

            this._gridId = gridId;
            this._gridAdvanced = gridAdvanced;
            this._dhtmlxTableData = dhtmlxTableData;
            this._serviceInvoker = serviceInvoker;
            this._cfg = configuration;
            this._callback = callback;
            this._defaultParams = serviceInvoker ? serviceInvoker.parameters : {};

            this._performanceMonitor = new _performanceMonitor.PerformanceMonitor(false);
        }

        ChildGridHandler.prototype.expandChildGrid = function expandChildGrid(rowId) {
            var _this = this;

            var _rowId = this._getRowId(rowId);
            this._performanceMonitor.startTime('loadChildGrid-' + _rowId);
            var gridRow = this._dhtmlxTableData.getRowById(_rowId);
            if (!gridRow.childrenLoaded) {
                if (this._serviceInvoker) {
                    this._setTreeLoadingIcon(_rowId);
                    var params = {
                        maxLevels: this._defaultParams.maxLevels || 1
                    };

                    if (this._defaultParams.rowsPerLevel) {
                        params.rowsPerLevel = this._defaultParams.rowsPerLevel;
                    }
                    params[this._cfg.idFieldName] = _rowId;

                    this._serviceInvoker.parameters = params;
                    this._serviceInvoker.invokeService(function (invoker) {
                        if (invoker && invoker.result) {
                            _this._createTableData(invoker.result.rows, _rowId);
                        }
                    }, function (message) {
                        _logger.Logger.error(message);
                    });

                    this._serviceInvoker.parameters = this._defaultParams;
                }
            }
        };

        ChildGridHandler.prototype.expandPath = function expandPath(rowId, isRowSelection) {
            var _this2 = this;

            if (rowId && rowId.trim().length > 0) {
                if (this._dhtmlxTableData.getRowById(rowId) !== undefined) {
                    if (isRowSelection) {
                        rowId = this._gridAdvanced.getParentId(this._getRowId(rowId));
                    }
                    this._gridAdvanced.openItem(rowId);
                } else if (this._serviceInvoker) {
                    (function () {
                        var state = _this2._gridAdvanced.getStateOfView();
                        var topRowId = _this2._gridAdvanced.getRowId(state[0]);
                        _this2._setTreeLoadingIcon(topRowId);
                        var params = {
                            maxLevels: 25,
                            leafId: rowId
                        };

                        if (_this2._defaultParams.rowsPerLevel) {
                            params.rowsPerLevel = _this2._defaultParams.rowsPerLevel;
                        }
                        _this2._serviceInvoker.parameters = params;
                        _this2._serviceInvoker.invokeService(function (invoker) {
                            if (invoker && invoker.result) {
                                var rows = invoker.result.rows.filter(_this2._filterLoadedRows.bind(_this2));
                                _this2._expandTableData(rows, rowId, topRowId, isRowSelection);
                            }
                        }, function (message) {
                            _logger.Logger.error(message);
                        });

                        _this2._serviceInvoker.parameters = _this2._defaultParams;
                    })();
                }
            }
        };

        ChildGridHandler.prototype._filterLoadedRows = function _filterLoadedRows(row) {
            return this._gridAdvanced.getRowIndex(row[this._cfg.idFieldName]) === -1;
        };

        ChildGridHandler.prototype._setTreeLoadingIcon = function _setTreeLoadingIcon(parentId) {
            var index = this._gridAdvanced.getRowIndex(parentId);
            if (index === -1) {
                return;
            }
            (0, _jquery2.default)('#' + this._gridId).children('.objbox').find('.treegrid_cell').find('.grid_collapse_icon').eq(index).attr('src', _SPINNER_ICON);
        };

        ChildGridHandler.prototype.collapseChildGrid = function collapseChildGrid(rowId) {
            var _this3 = this;

            var clearCache = this._gridAdvanced.getRowsNum() > this._cfg.maxRowCacheSize;
            this._rowId = this._getRowId(rowId);
            if (clearCache) {
                this._setTreeLoadingIcon(this._rowId);

                setTimeout(function () {
                    _this3._deleteChildItems(rowId);
                }.bind(this), 100);
            }
        };

        ChildGridHandler.prototype._deleteChildItems = function _deleteChildItems(rowId) {
            var gridRow = this._dhtmlxTableData.getRowById(rowId);
            this._gridAdvanced.deleteChildItems(rowId);
            var item = this._gridAdvanced._h2.get[rowId];
            item.update = true;
            item.state = 'plus';
            item._xml_await = true;
            this._gridAdvanced._updateTGRState(item);

            gridRow.rows = [];
            gridRow.childrenLoaded = false;
            gridRow.isExpanded = false;
            this._callback();
        };

        ChildGridHandler.prototype._createTableData = function _createTableData(rows, rowId) {
            this._performanceMonitor.endTime('loadChildGrid-' + rowId);
            this._performanceMonitor.startTime('createDataTable-' + rowId);
            var data = this._dhtmlxTableData.orderData(rows, rowId, false);
            this._gridAdvanced.parse(data, 'json');
            if (this._cfg.expandAllLoadedLevels) {
                this._gridAdvanced.expandAll();
            } else {
                this._gridAdvanced.openItem(rowId);
            }
            var gridRow = this._dhtmlxTableData.getRowById(rowId);
            if (gridRow) {
                gridRow.isExpanded = true;
                gridRow.childrenLoaded = true;
            }
            this._callback();
            this._performanceMonitor.endTime('createDataTable-' + rowId);
        };

        ChildGridHandler.prototype._expandTableData = function _expandTableData(rows, rowId, topRowId, isRowSelection) {
            this._performanceMonitor.endTime('loadChildGrid-' + rowId);
            this._performanceMonitor.startTime('createDataTable-' + rowId);
            if (rows && rows.length > 0) {
                var data = this._dhtmlxTableData.orderData(rows, undefined, false);
                data.parent = data.rows[0].parent;
                this._gridAdvanced.parse(data, 'json');
                if (isRowSelection) {
                    rowId = this._gridAdvanced.getParentId(this._getRowId(rowId));
                }
                var gridRow = this._dhtmlxTableData.getRowById(this._getRowId(rowId));

                this._resetSpinner(topRowId);
                this._gridAdvanced.openItem(gridRow[this._cfg.idFieldName]);
                if (gridRow) {
                    gridRow.isExpanded = true;
                }
                this._callback();
            } else {
                this._resetSpinner(topRowId);
            }

            this._performanceMonitor.endTime('createDataTable-' + rowId);
        };

        ChildGridHandler.prototype._getRowId = function _getRowId(rowId) {
            var id = rowId;
            if (rowId.indexOf(':;') > -1) {
                var ids = rowId.split(':;');
                id = ids[ids.length - 1];
            }
            return id;
        };

        ChildGridHandler.prototype._resetSpinner = function _resetSpinner(topRowId) {
            var topGridRow = this._dhtmlxTableData.getRowById(topRowId);
            var item = this._gridAdvanced._h2.get[topRowId];
            item.update = true;
            item.state = topGridRow.isExpanded ? 'minus' : 'plus';
            this._gridAdvanced._updateTGRState(item);
        };

        return ChildGridHandler;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/child-grid-handler.js.map

gaRequire.define('tw-grid-advanced/query-handler',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var QueryHandler = exports.QueryHandler = function () {
        function QueryHandler(configuration) {
            _classCallCheck(this, QueryHandler);

            this._cfg = configuration;

            this._sortColumns = [];
        }

        QueryHandler.prototype.createFilterQuery = function createFilterQuery(searchValue, sortColumns, dataFilterQuery) {
            var query = {};
            if (searchValue) {
                query.filters = this._createSearchQuery(searchValue);
            }
            if (this._cfg.enableColumnSorting) {
                query.sorts = this._createSortQuery(sortColumns);
            }

            return this._combineFilters(query, dataFilterQuery);
        };

        QueryHandler.prototype._createSortQuery = function _createSortQuery(sortColumns) {
            var sorts = [];
            if (sortColumns) {
                sortColumns.forEach(function (entry) {
                    var sort = {};
                    sort.fieldName = entry.id;
                    sort.isAscending = entry.direction === 'asc';
                    sorts.push(sort);
                });
            }
            return sorts;
        };

        QueryHandler.prototype._createSearchQuery = function _createSearchQuery(input) {
            var filter = {
                type: 'OR',
                filters: []
            };
            input = '%' + input + '%';
            var length = this._cfg.columnDefinitions.length;
            for (var index = 0; index < length; index++) {
                filter.filters.push({
                    type: 'LIKE',
                    fieldName: this._cfg.columnDefinitions[index].fieldName,
                    value: input
                });
            }
            return filter;
        };

        QueryHandler.prototype._combineFilters = function _combineFilters(query, dataFilterQuery) {
            var myparams = { query: {} };
            var dataFilter;
            var searchFilter;

            if (query) {
                if (query.filters && query.filters.filters) {
                    searchFilter = {
                        type: 'OR',
                        filters: this._createFilters(query.filters.filters)
                    };
                }
                if (query.sorts) {
                    myparams.query = { sorts: this._createSorts(query.sorts) };
                }
            }
            if (dataFilterQuery && dataFilterQuery.filters) {
                if (dataFilterQuery.filters.filters) {
                    dataFilter = {
                        type: 'And',
                        filters: this._createFilters(dataFilterQuery.filters.filters)
                    };
                } else {
                    dataFilter = {
                        fieldName: dataFilterQuery.filters.fieldName,
                        type: dataFilterQuery.filters.type,
                        value: dataFilterQuery.filters.value
                    };
                }
            }

            var query = myparams.query;
            if (dataFilter && searchFilter) {
                query.filters = {
                    type: 'And',
                    filters: [dataFilter, searchFilter]
                };
            } else if (dataFilter) {
                query.filters = dataFilter;
            } else if (searchFilter) {
                query.filters = searchFilter;
            }
            return myparams;
        };

        QueryHandler.prototype._createFilters = function _createFilters(filters) {
            var myfilters = [];
            if (filters) {
                for (var i = 0; i < filters.length; i++) {
                    var myFilter = {
                        fieldName: filters[i].fieldName,
                        type: filters[i].type,
                        value: filters[i].value
                    };
                    myfilters.push(myFilter);
                }
            }
            return myfilters;
        };

        QueryHandler.prototype._createSorts = function _createSorts(sorts) {
            var mySorts = [];
            if (sorts) {
                for (var i = 0; i < sorts.length; i++) {
                    var mySort = {
                        fieldName: sorts[i].fieldName,
                        isAscending: sorts[i].isAscending
                    };
                    mySorts.push(mySort);
                }
            }
            return mySorts;
        };

        return QueryHandler;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/query-handler.js.map

gaRequire.define('tw-grid-advanced/configuration-parser-factory',['exports', './logger', './json-configuration-parser', './mashup-builder-configuration-parser'], function (exports, _logger, _jsonConfigurationParser, _mashupBuilderConfigurationParser) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ConfigurationParserFactory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ConfigurationParserFactory = exports.ConfigurationParserFactory = function () {
        function ConfigurationParserFactory() {
            _classCallCheck(this, ConfigurationParserFactory);
        }

        ConfigurationParserFactory.createParser = function createParser(type, object, styleResolver, localizationResolver) {
            var isTreeGrid = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

            switch (type) {
                case 'mashup-builder':
                    return new _mashupBuilderConfigurationParser.MashupBuilderConfigurationParser(object, styleResolver, localizationResolver, isTreeGrid);
                case 'dynamic':
                    return new _jsonConfigurationParser.JsonConfigurationParser(object, isTreeGrid);
                default:
                    _logger.Logger.error('Parser of type "' + type + '" does not exist');
            }
            return null;
        };

        return ConfigurationParserFactory;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/configuration-parser-factory.js.map

gaRequire.define('tw-grid-advanced/json-configuration-parser',['exports', 'lodash-amd', './column-definition', './header-definition', './column-formatter-factory', '../../components/definitions/state-definition', './row-formatter', './row-definition', './pagination-settings', './search-settings', './configuration-parser', './logger'], function (exports, _lodashAmd, _columnDefinition, _headerDefinition, _columnFormatterFactory, _stateDefinition, _rowFormatter, _rowDefinition, _paginationSettings, _searchSettings, _configurationParser, _logger) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.JsonConfigurationParser = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var JsonConfigurationParser = exports.JsonConfigurationParser = function (_ConfigurationParser) {
        _inherits(JsonConfigurationParser, _ConfigurationParser);

        function JsonConfigurationParser(configuration, isTreeGrid) {
            _classCallCheck(this, JsonConfigurationParser);

            var _this = _possibleConstructorReturn(this, _ConfigurationParser.call(this));

            _this._isTreeGrid = isTreeGrid;
            _this._gridAdvancedConfiguration.styleDefinitions = _this.createStyleDefinitions(configuration.styles);
            _this._gridAdvancedConfiguration.headerDefinition = _this._createHeaderDefinition(configuration);
            _this._gridAdvancedConfiguration.columnDefinitions = _this._createColumnDefinitions(configuration);
            _this._gridAdvancedConfiguration.paginationSettings = _this._createPaginationSettings(configuration);
            _this._gridAdvancedConfiguration.rowFormatter = _this._createRowFormatter(configuration);
            _this._gridAdvancedConfiguration.rowDefinition = _this._createRowDefinition(configuration);

            _this._gridAdvancedConfiguration.splitColumnIndex = -1;
            _this._gridAdvancedConfiguration.searchSettings = _this._createSearchSettings(configuration);
            _this._gridAdvancedConfiguration.resetButton = configuration.resetButton;
            _this._createMultiColumnSortOrder(configuration);
            _this._gridAdvancedConfiguration.maxRowCacheSize = _this._createMaxRowCacheSize(configuration);
            _this._gridAdvancedConfiguration.parentIdFieldName = _this._createParentIdFieldName(configuration);
            _this._gridAdvancedConfiguration.idFieldName = _this._createIdFieldName(configuration);
            _this._gridAdvancedConfiguration.hasChildrenFieldName = _this._createHasChildrenFieldName(configuration);
            _this._gridAdvancedConfiguration.expandAllLoadedLevels = _this._createExpandAllLoadedLevels(configuration);
            _this._gridAdvancedConfiguration.includeRowExpansionParents = _this._createIncludeRowExpansionParents(configuration);
            _this._gridAdvancedConfiguration.preserveRowExpansion = _this._createPreserveRowExpansion(configuration);
            return _this;
        }

        JsonConfigurationParser.prototype._createPaginationSettings = function _createPaginationSettings(config) {
            var paginationSettings = void 0;
            if (config && config.pagination) {
                paginationSettings = new _paginationSettings.PaginationSettings(config.pagination.enabled, config.pagination.pageLength, config.pagination.pagingType, config.pagination.pageLocation, config.pagination.pageButtons);
            } else {
                paginationSettings = new _paginationSettings.PaginationSettings();
            }
            return paginationSettings;
        };

        JsonConfigurationParser.prototype._createSearchSettings = function _createSearchSettings(config) {
            var searchSettings = void 0;
            if (config && config.search) {
                var _config$search$multiC = config.search.multiColumn.location.split('-'),
                    vertAlign = _config$search$multiC[0],
                    align = _config$search$multiC[1];

                searchSettings = new _searchSettings.SearchSettings(config.search.multiColumn.enabled, vertAlign, align);
            } else {
                searchSettings = new _searchSettings.SearchSettings();
            }
            return searchSettings;
        };

        JsonConfigurationParser.prototype._createColumnDefinitions = function _createColumnDefinitions(config) {
            var _this2 = this;

            var _columnDefs = void 0;
            if (config && config.columns && config.columns.columnDefs && config.columns.columnDefs.length >= 0) {
                _columnDefs = [];
                _lodashAmd2.default.forEach(config.columns.columnDefs, function (columnDef) {
                    _columnDefs.push(_this2._createColumnDefinition(columnDef));
                });
            }
            return _columnDefs;
        };

        JsonConfigurationParser.prototype._createMultiColumnSortOrder = function _createMultiColumnSortOrder(config) {
            var multiColumnSortOrder = [];
            var enableSorting = false;
            if (config && config.columns) {
                enableSorting = config.columns.enableSorting;
                if (config.columns.multiColumnSortOrder) {
                    multiColumnSortOrder = config.columns.multiColumnSortOrder;
                }
            }
            this._gridAdvancedConfiguration.enableColumnSorting = enableSorting;
            this._gridAdvancedConfiguration.multiColumnSortOrder = multiColumnSortOrder;
        };

        JsonConfigurationParser.prototype._createRowDefinition = function _createRowDefinition(config) {
            var rowDefinition = void 0;
            if (config && config.rows) {
                rowDefinition = new _rowDefinition.RowDefinition(config.rows.stateFormatter, config.rows.childRowDetails);
                rowDefinition.selection = config.rows.selection;
                rowDefinition.defaultSelectedRows = config.rows.defaultSelectedRows;
                rowDefinition.defaultSelectedRowExpanded = config.rows.defaultSelectedRowExpanded;
                rowDefinition.batchEditMode = config.rows.batchEditMode;
                rowDefinition.childRowsEnabled = config.rows.childRowsEnabled;
                rowDefinition.defaultSelectedRows = this._createDefaultSelectedRows(config);
                rowDefinition.minRowHeight = config.rows.minHeight;
                rowDefinition.sizeImageToRow = config.rows.sizeImageToRow;
                rowDefinition.autoScroll = config.rows.autoScroll;
            }
            return rowDefinition;
        };

        JsonConfigurationParser.prototype._createColumnDefinition = function _createColumnDefinition(columnDef) {
            var columnDefinition = void 0;
            if (columnDef) {
                columnDefinition = new _columnDefinition.ColumnDefinition(columnDef.targets, columnDef.fieldName, columnDef.title, this._createColumnFormatter(columnDef.columnFormatter));
                columnDefinition.width = columnDef.width;
                columnDefinition.autoWidth = columnDef.autoWidth;
                columnDefinition.overflow = columnDef.overflow;
                columnDefinition.textAlignment = columnDef.textAlignment.toLowerCase();
                columnDefinition.headerTextAlignment = columnDef.headerTextAlignment.toLowerCase();
                columnDefinition.hidden = columnDef.hidden;
                columnDefinition.inLayout = columnDef.inLayout;
                columnDefinition.sortOrder = columnDef.sortOrder;
                columnDefinition.description = columnDef.description;
            }
            return columnDefinition;
        };

        JsonConfigurationParser.prototype._createColumnFormatter = function _createColumnFormatter(formatterDef) {
            var columnFormatter = void 0;
            if (formatterDef) {
                columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter(formatterDef.type, formatterDef.format, formatterDef.params);
                if (columnFormatter) {
                    columnFormatter.stateDefinition = this._createStateDefinition(formatterDef.stateDefinition);
                }
            } else {
                columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter('default', '', null);
            }
            return columnFormatter;
        };

        JsonConfigurationParser.prototype._createStateDefinition = function _createStateDefinition(stateDefinitionDef) {
            var _this3 = this;

            var stateDefinition = void 0;
            if (stateDefinitionDef) {
                stateDefinition = new _stateDefinition.StateDefinition(stateDefinitionDef.name, stateDefinitionDef.type, stateDefinitionDef.fieldName);
                _lodashAmd2.default.forEach(stateDefinitionDef.states, function (state) {
                    var style = _this3._findStyleDefinition(state.styleName);
                    if (!style) {
                        _logger.Logger.warn('Could not find style definition with name "' + state.styleName + '" for state definition "' + stateDefinitionDef.name + '".');
                    }
                    stateDefinition.addState(state.name, state.value, state.comparator, _this3._findStyleDefinition(state.styleName));
                });
            }
            return stateDefinition;
        };

        JsonConfigurationParser.prototype._createHeaderDefinition = function _createHeaderDefinition(config) {
            var headerDefinition = void 0;
            if (config && config.columns && config.columns.header) {
                headerDefinition = new _headerDefinition.HeaderDefinition();
                headerDefinition.titleCase = config.columns.header.titleCase;
                headerDefinition.overflow = config.columns.header.overflow;
                headerDefinition.fixedHeader = config.columns.header.fixedHeader;
                headerDefinition.maxHeight = config.columns.header.maxHeight;
            }
            return headerDefinition;
        };

        JsonConfigurationParser.prototype._createRowFormatter = function _createRowFormatter(config) {
            var rowFormatter = void 0;
            if (config && config.rows && config.rows.rowFormatter) {
                var stateDefinition = this._createStateDefinition(config.rows.rowFormatter.stateDefinition);
                rowFormatter = new _rowFormatter.RowFormatter(stateDefinition);
            }
            return rowFormatter;
        };

        JsonConfigurationParser.prototype._createDefaultSelectedRows = function _createDefaultSelectedRows(config) {
            var defaultSelectedRows = void 0;
            if (config && config.rows) {
                defaultSelectedRows = _configurationParser.ConfigurationParser.convertDefaultSelectedRows(config.rows.defaultSelectedRows);
            }
            return defaultSelectedRows;
        };

        JsonConfigurationParser.prototype._createSplitColumnIndex = function _createSplitColumnIndex(config) {
            var splitColumnIndex = void 0;
            if (config && config.columns) {
                splitColumnIndex = config.columns.splitColumnIndex;
            }
            return splitColumnIndex;
        };

        JsonConfigurationParser.prototype._createMaxRowCacheSize = function _createMaxRowCacheSize(config) {
            var maxRowCacheSize = void 0;
            if (config && config.treeSettings) {
                maxRowCacheSize = config.treeSettings.maxRowCacheSize;
            }
            return maxRowCacheSize;
        };

        JsonConfigurationParser.prototype._createIdFieldName = function _createIdFieldName(config) {
            var idFieldName = void 0;
            if (config && config.columns) {
                idFieldName = config.columns.idFieldName;
            }
            return idFieldName;
        };

        JsonConfigurationParser.prototype._createParentIdFieldName = function _createParentIdFieldName(config) {
            var parentIdFieldName = void 0;
            if (config && config.treeSettings) {
                parentIdFieldName = config.treeSettings.parentIdFieldName;
            }
            return parentIdFieldName;
        };

        JsonConfigurationParser.prototype._createHasChildrenFieldName = function _createHasChildrenFieldName(config) {
            var hasChildrenFieldName = void 0;
            if (config && config.treeSettings) {
                hasChildrenFieldName = config.treeSettings.hasChildrenFieldName;
            }
            return hasChildrenFieldName;
        };

        JsonConfigurationParser.prototype._createIncludeRowExpansionParents = function _createIncludeRowExpansionParents(config) {
            var includeRowExpansionParents = false;
            if (config && config.treeSettings) {
                includeRowExpansionParents = config.treeSettings.includeRowExpansionParents;
            }
            return includeRowExpansionParents;
        };

        JsonConfigurationParser.prototype._createExpandAllLoadedLevels = function _createExpandAllLoadedLevels(config) {
            var expandAllLoadedLevels = false;
            if (config && config.treeSettings) {
                expandAllLoadedLevels = config.treeSettings.expandAllLoadedLevels;
            }
            return expandAllLoadedLevels;
        };

        JsonConfigurationParser.prototype._createPreLoadTreeLevels = function _createPreLoadTreeLevels(config) {
            var preLoadTreeLevels = 1;
            if (config && config.treeSettings && config.treeSettings.preLoadTreeLevels > 0) {
                preLoadTreeLevels = config.treeSettings.preLoadTreeLevels > 10 ? 10 : config.treeSettings.preLoadTreeLevels;
            }
            return preLoadTreeLevels;
        };

        JsonConfigurationParser.prototype._createPreserveRowExpansion = function _createPreserveRowExpansion(config) {
            var preserveRowExpansion = false;
            if (config && config.treeSettings && config.treeSettings.preserveRowExpansion) {
                preserveRowExpansion = config.treeSettings.preserveRowExpansion;
            }
            return preserveRowExpansion;
        };

        JsonConfigurationParser.prototype._findStyleDefinition = function _findStyleDefinition(styleName) {
            return _lodashAmd2.default.find(this._gridAdvancedConfiguration.styleDefinitions, function (styleDef) {
                return styleName === styleDef.displayName;
            });
        };

        _createClass(JsonConfigurationParser, [{
            key: 'columnDefinitions',
            get: function get() {
                return this._columnDefinitions;
            }
        }, {
            key: 'rowDefinition',
            get: function get() {
                return this._rowDefinition;
            }
        }, {
            key: 'headerDefinition',
            get: function get() {
                return this._headerDefinition;
            }
        }, {
            key: 'rowFormatter',
            get: function get() {
                return this._rowFormatter;
            }
        }, {
            key: 'paginationSettings',
            get: function get() {
                return this._paginationSettings;
            }
        }]);

        return JsonConfigurationParser;
    }(_configurationParser.ConfigurationParser);
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/json-configuration-parser.js.map

gaRequire.define('tw-grid-advanced/header-definition',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var HeaderDefinition = exports.HeaderDefinition = function () {
        function HeaderDefinition() {
            _classCallCheck(this, HeaderDefinition);

            this._overflow = 'wrapped';
            this._maxHeight = 100;
            this._alignHeader = false;
        }

        HeaderDefinition.prototype.formatTitle = function formatTitle(title) {
            var formattedTitle = void 0;
            switch (this._titleCase) {
                case 'lower':
                    formattedTitle = title.toLowerCase();
                    break;
                case 'upper':
                    formattedTitle = title.toUpperCase();
                    break;
                case 'camel':
                    formattedTitle = title.split(' ').map(function (word) {
                        return word.charAt(0).toUpperCase() + word.slice(1);
                    }).join('');
                    break;
                default:
                    formattedTitle = title;
            }
            return formattedTitle;
        };

        _createClass(HeaderDefinition, [{
            key: 'alignHeader',
            get: function get() {
                return this._alignHeader;
            },
            set: function set(alignHeader) {
                this._alignHeader = alignHeader;
            }
        }, {
            key: 'titleCase',
            get: function get() {
                return this._titleCase;
            },
            set: function set(titleCase) {
                this._titleCase = titleCase;
            }
        }, {
            key: 'overflow',
            get: function get() {
                return this._overflow;
            },
            set: function set(overflow) {
                this._overflow = overflow;
            }
        }, {
            key: 'maxHeight',
            get: function get() {
                return this._maxHeight;
            },
            set: function set(maxHeight) {
                if (maxHeight) {
                    this._maxHeight = maxHeight;
                }
            }
        }, {
            key: 'fixedHeader',
            get: function get() {
                return this._fixedHeader;
            },
            set: function set(fixedHeader) {
                this._fixedHeader = fixedHeader;
            }
        }]);

        return HeaderDefinition;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/header-definition.js.map

gaRequire.define('tw-grid-advanced/column-formatter-factory',['exports', './column-formatter', '../../components/renderers/string-renderer', '../../components/renderers/integer-renderer', '../../components/renderers/long-renderer', '../../components/renderers/boolean-renderer', '../../components/renderers/datetime-renderer', '../../components/renderers/html-renderer', '../../components/renderers/imagelink-renderer', '../../components/renderers/number-renderer', '../../components/renderers/hyperlink-renderer', '../../components/renderers/default-renderer'], function (exports, _columnFormatter, _stringRenderer, _integerRenderer, _longRenderer, _booleanRenderer, _datetimeRenderer, _htmlRenderer, _imagelinkRenderer, _numberRenderer, _hyperlinkRenderer, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ColumnFormatterFactory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ColumnFormatterFactory = exports.ColumnFormatterFactory = function () {
        function ColumnFormatterFactory() {
            _classCallCheck(this, ColumnFormatterFactory);
        }

        ColumnFormatterFactory.getFormatter = function getFormatter(type, valueFormat, params, widget) {

            var converter = void 0;
            switch (type.toLowerCase()) {
                case 'string':
                    converter = new _stringRenderer.StringRenderer(valueFormat, params, widget);
                    break;
                case 'integer':
                    converter = new _integerRenderer.IntegerRenderer(valueFormat, params, widget);
                    break;
                case 'long':
                    converter = new _longRenderer.LongRenderer(valueFormat, params, widget);
                    break;
                case 'boolean':
                    converter = new _booleanRenderer.BooleanRenderer(valueFormat, params, widget);
                    break;
                case 'number':
                    converter = new _numberRenderer.NumberRenderer(valueFormat, params, widget);
                    break;
                case 'datetime':
                    converter = new _datetimeRenderer.DatetimeRenderer(valueFormat, params, widget);
                    break;
                case 'html':
                    converter = new _htmlRenderer.HtmlRenderer(valueFormat, params, widget);
                    break;
                case 'imagelink':
                    converter = new _imagelinkRenderer.ImagelinkRenderer(valueFormat, params, widget);
                    break;
                case 'hyperlink':
                    converter = new _hyperlinkRenderer.HyperlinkRenderer(valueFormat, params, widget);
                    break;
                default:
                    converter = new _defaultRenderer.DefaultRenderer(valueFormat, params, widget);
            }
            return new _columnFormatter.ColumnFormatter(converter);
        };

        return ColumnFormatterFactory;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/column-formatter-factory.js.map

gaRequire.define('tw-grid-advanced/column-formatter',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var ColumnFormatter = exports.ColumnFormatter = function () {
        function ColumnFormatter(valueConverter) {
            _classCallCheck(this, ColumnFormatter);

            this._valueConverter = valueConverter;
        }

        ColumnFormatter.prototype.getColumnStyles = function getColumnStyles(value) {
            var styles = '';
            if (value) {
                if (this._stateDefinition) {
                    var state = this._stateDefinition.type === 'fixed' ? this._stateDefinition.states[0] : this._stateDefinition.findStateByValue(value);
                    if (state && state.styleDefinition) {

                        styles += state.styleDefinition.getBackgroundStyle();
                        styles += state.styleDefinition.getBorderStyle();
                        styles += state.styleDefinition.getFontStyle();
                    }
                }
            }
            return styles;
        };

        ColumnFormatter.prototype._getImageLink = function _getImageLink(value) {
            var imgLink = void 0;
            if (value !== undefined) {
                if (this._stateDefinition) {
                    var state = this._stateDefinition.type === 'fixed' ? this._stateDefinition.states[0] : this._stateDefinition.findStateByValue(value);
                    if (state && state.styleDefinition) {
                        imgLink = state.styleDefinition.image;
                    }
                }
            }
            return imgLink;
        };

        ColumnFormatter.prototype.formatValue = function formatValue(data, stateData) {
            return this._valueConverter ? this._valueConverter.toView(data, this._getImageLink(stateData)) : data;
        };

        _createClass(ColumnFormatter, [{
            key: 'valueConverter',
            get: function get() {
                return this._valueConverter;
            }
        }, {
            key: 'stateDefinition',
            set: function set(stateDefinition) {
                this._stateDefinition = stateDefinition;
            },
            get: function get() {
                return this._stateDefinition;
            }
        }]);

        return ColumnFormatter;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/column-formatter.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/integer-renderer',['exports', './number-renderer'], function (exports, _numberRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.IntegerRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var IntegerRenderer = exports.IntegerRenderer = function (_NumberRenderer) {
        _inherits(IntegerRenderer, _NumberRenderer);

        function IntegerRenderer(valueFormat, params) {
            _classCallCheck(this, IntegerRenderer);

            if (valueFormat.indexOf('.') >= 0) {
                valueFormat = valueFormat.substring(0, valueFormat.indexOf('.'));
            }
            return _possibleConstructorReturn(this, _NumberRenderer.call(this, valueFormat, params));
        }

        IntegerRenderer.prototype.toView = function toView(value, imageLink) {
            return _NumberRenderer.prototype.toView.call(this, value, imageLink);
        };

        return IntegerRenderer;
    }(_numberRenderer.NumberRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/integer-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/long-renderer',['exports', './number-renderer'], function (exports, _numberRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LongRenderer = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var LongRenderer = exports.LongRenderer = function (_NumberRenderer) {
        _inherits(LongRenderer, _NumberRenderer);

        function LongRenderer(valueFormat, params) {
            _classCallCheck(this, LongRenderer);

            if (valueFormat.indexOf('.') >= 0) {
                valueFormat = valueFormat.substring(0, valueFormat.indexOf('.'));
            }
            return _possibleConstructorReturn(this, _NumberRenderer.call(this, valueFormat, params));
        }

        LongRenderer.prototype.toView = function toView(value, imageLink) {
            return _NumberRenderer.prototype.toView.call(this, value, imageLink);
        };

        return LongRenderer;
    }(_numberRenderer.NumberRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/long-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/imagelink-renderer',['exports', 'html-css-sanitizer', './default-renderer'], function (exports, _htmlCssSanitizer, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ImagelinkRenderer = undefined;

    var _htmlCssSanitizer2 = _interopRequireDefault(_htmlCssSanitizer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ImagelinkRenderer = exports.ImagelinkRenderer = function (_DefaultRenderer) {
        _inherits(ImagelinkRenderer, _DefaultRenderer);

        function ImagelinkRenderer(valueFormat, params) {
            _classCallCheck(this, ImagelinkRenderer);

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));
        }

        ImagelinkRenderer.prototype.toView = function toView(value) {
            value = _DefaultRenderer.prototype.toView.call(this, value);
            var safeImageLink = this._convertImageLink(value);
            switch (this._valueFormat) {
                case 'hyperlink':
                    return this._convertToHyperlink(value);
                case 'scaledtowidth':
                    return '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:100% auto;height:100%;width:100%;display:list-item;background-position-y: 50%;" ></div>';
                case 'scaledtoheight':
                    return '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:auto 100%;height:100%;width:100%;display:list-item;background-position-y: 50%;" ></div>';
                case 'image':
                default:
                    return '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:auto;height:100%;width:100%;display:list-item;background-position-y: 50%;" ></div>';
            }
        };

        ImagelinkRenderer.prototype._convertToHyperlink = function _convertToHyperlink(imageLink) {
            var imageName = 'Click for image';
            if (imageLink && typeof imageLink === 'string' && imageLink.indexOf('/') > -1) {
                imageName = imageLink.substring(imageLink.lastIndexOf('/') + 1);
            }
            imageLink = this._convertImageLink(imageLink);
            return '<a target="_blank" href="' + imageLink + '">' + imageName + '</a>';
        };

        ImagelinkRenderer.prototype._convertImageLink = function _convertImageLink(imageLink) {
            var path = '';
            if (imageLink && typeof imageLink === 'string') {
                if (imageLink.length > 0 && imageLink.indexOf('/') === -1) {
                    path = '/Thingworx/MediaEntities/' + encodeURIComponent(imageLink);
                } else {
                    if (imageLink.indexOf('http') !== 0) {
                        imageLink = window.location.origin + imageLink;
                    }
                    path = this._sanitize(imageLink);
                }
            }
            return path;
        };

        ImagelinkRenderer.prototype._sanitize = function _sanitize(html) {
            return _htmlCssSanitizer2.default.sanitize(html, function (u) {
                return u;
            }, function (id) {
                return id;
            });
        };

        return ImagelinkRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../maps/components/renderers/imagelink-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/renderers/hyperlink-renderer',['exports', 'html-css-sanitizer', './default-renderer'], function (exports, _htmlCssSanitizer, _defaultRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.HyperlinkRenderer = undefined;

    var _htmlCssSanitizer2 = _interopRequireDefault(_htmlCssSanitizer);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var _class, _temp;

    var HyperlinkRenderer = exports.HyperlinkRenderer = (_temp = _class = function (_DefaultRenderer) {
        _inherits(HyperlinkRenderer, _DefaultRenderer);

        function HyperlinkRenderer(valueFormat, params) {
            _classCallCheck(this, HyperlinkRenderer);

            var _this = _possibleConstructorReturn(this, _DefaultRenderer.call(this, valueFormat, params));

            _this._validateValueFormat();
            _this._validateTextFormat();
            return _this;
        }

        HyperlinkRenderer.prototype._validateTextFormat = function _validateTextFormat() {
            if (!this._params) {
                this._params = {
                    textFormat: HyperlinkRenderer.DEFAULT_TEXT_FORMAT
                };
            }
        };

        HyperlinkRenderer.prototype._validateValueFormat = function _validateValueFormat() {
            if (['_self', '_blank', '_parent', '_top'].indexOf(this._valueFormat) === -1) {
                this._valueFormat = HyperlinkRenderer.DEFAULT_VALUE_FORMAT;
            }
        };

        HyperlinkRenderer.prototype.toView = function toView(value) {
            var view = '';
            if (value) {
                var encodedValue = _DefaultRenderer.prototype.toView.call(this, this._sanitize(value));
                view = '<a target="' + this._valueFormat + '" href="' + encodedValue + '">' + this._params.textFormat + '</a>';
            }
            return view;
        };

        HyperlinkRenderer.prototype._sanitize = function _sanitize(html) {
            return _htmlCssSanitizer2.default.sanitize(html, function (u) {
                return u;
            }, function (id) {
                return id;
            });
        };

        return HyperlinkRenderer;
    }(_defaultRenderer.DefaultRenderer), _class.DEFAULT_VALUE_FORMAT = '_blank', _class.DEFAULT_TEXT_FORMAT = 'View', _temp);
});
//# sourceMappingURL=../../maps/components/renderers/hyperlink-renderer.js.map

gaRequire.define('tw-grid-advanced/../../components/definitions/state-definition',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.StateDefinition = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var State = function () {
        function State(name, value, comparator, styleDefinition) {
            _classCallCheck(this, State);

            this._name = name;
            this._value = value;
            this._comparator = comparator;
            this._styleDefinition = styleDefinition;
        }

        _createClass(State, [{
            key: 'name',
            get: function get() {
                return this._name;
            }
        }, {
            key: 'value',
            get: function get() {
                return this._value;
            }
        }, {
            key: 'comparator',
            get: function get() {
                return this._comparator;
            }
        }, {
            key: 'styleDefinition',
            get: function get() {
                return this._styleDefinition;
            }
        }]);

        return State;
    }();

    var StateDefinition = exports.StateDefinition = function () {
        function StateDefinition(name, type, fieldName) {
            _classCallCheck(this, StateDefinition);

            this._name = name;
            this._type = type;
            this._fieldName = fieldName;
            this._states = [];
        }

        StateDefinition.prototype.addState = function addState(name, value, comparator, styleDefinition) {
            if (!name) {
                name = value;
            }
            var foundState = _lodashAmd2.default.find(this._states, function (state) {
                return name === state.name;
            });
            if (!foundState) {
                this._states.push(new State(name, value, comparator, styleDefinition));
            }
        };

        StateDefinition.prototype.removeState = function removeState(name) {
            _lodashAmd2.default.remove(this._states, function (state) {
                return state.name === name;
            });
        };

        StateDefinition.prototype.findStateByValue = function findStateByValue(stateValue) {
            var foundState = _lodashAmd2.default.find(this._states, function (state) {
                var value = state.value;
                if (state.value === 'true' && typeof stateValue === 'boolean') {
                    value = true;
                } else if (state.value === 'false' && typeof stateValue === 'boolean') {
                    value = false;
                }
                switch (state.comparator) {
                    case '==':
                        return stateValue === value;
                    case '!=':
                        return stateValue !== value;
                    case '>':
                        return stateValue > value;
                    case '<':
                        return stateValue < value;
                    case '>=':
                        return stateValue >= value;
                    case '<=':
                        return stateValue <= value;
                    default:
                        return false;
                }
            });
            return foundState;
        };

        _createClass(StateDefinition, [{
            key: 'name',
            get: function get() {
                return this._name;
            }
        }, {
            key: 'type',
            get: function get() {
                return this._type;
            }
        }, {
            key: 'fieldName',
            get: function get() {
                return this._fieldName;
            }
        }, {
            key: 'states',
            get: function get() {
                return this._states;
            }
        }]);

        return StateDefinition;
    }();
});
//# sourceMappingURL=../../maps/components/definitions/state-definition.js.map

gaRequire.define('tw-grid-advanced/row-formatter',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.RowFormatter = undefined;

    var _lodashAmd2 = _interopRequireDefault(_lodashAmd);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var RowFormatter = exports.RowFormatter = function () {
        function RowFormatter(stateDefinition) {
            _classCallCheck(this, RowFormatter);

            this._stateDefinition = stateDefinition;
        }

        RowFormatter.prototype.format = function format(row, stateValue) {
            var currentState = this.type === 'fixed' ? this._stateDefinition.states[0] : this._stateDefinition.findStateByValue(stateValue);
            if (currentState) {
                this.updateTableRowStyles(currentState.styleDefinition, row);
            }
        };

        RowFormatter.prototype.updateTableRowStyles = function updateTableRowStyles(styleDefinition, row) {
            if (styleDefinition && row) {
                var styles = '';

                styles += styleDefinition.getBackgroundStyle();
                styles += styleDefinition.getBorderStyle();
                styles += styleDefinition.getFontStyle();

                _lodashAmd2.default.set(row, 'style', styles);
            }
        };

        _createClass(RowFormatter, [{
            key: 'type',
            get: function get() {
                return this._stateDefinition.type;
            }
        }, {
            key: 'stateDefinition',
            get: function get() {
                return this._stateDefinition;
            }
        }]);

        return RowFormatter;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/row-formatter.js.map

gaRequire.define('tw-grid-advanced/row-definition',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var RowDefinition = exports.RowDefinition = function () {
        function RowDefinition(stateFormatter, childRowDetails) {
            _classCallCheck(this, RowDefinition);

            this._selection = 'single';
            this._defaultSelectedRows = '';
            this._defaultSelectedRowExpanded = false;
            this._batchEditMode = 'selected';
            this._stateFormatter = stateFormatter;
            this._childRowsEnabled = false;
            this._childRowDetails = childRowDetails;
            this._minRowHeight = 30;
            this._autoScroll = false;
        }

        RowDefinition.prototype.validateFormat = function validateFormat(format) {};

        _createClass(RowDefinition, [{
            key: 'autoScroll',
            get: function get() {
                return this._autoScroll;
            },
            set: function set(autoScroll) {
                this._autoScroll = autoScroll;
            }
        }, {
            key: 'minRowHeight',
            get: function get() {
                return this._minRowHeight;
            },
            set: function set(rowHeight) {
                rowHeight = parseInt(rowHeight, 10);
                if (isNaN(rowHeight) || rowHeight === 0) {
                    return;
                }
                this._minRowHeight = rowHeight;
            }
        }, {
            key: 'selection',
            get: function get() {
                return this._selection;
            },
            set: function set(selection) {
                this._selection = selection;
            }
        }, {
            key: 'defaultSelectedRows',
            get: function get() {
                return this._defaultSelectedRows;
            },
            set: function set(defaultSelectedRows) {
                this._defaultSelectedRows = defaultSelectedRows;
            }
        }, {
            key: 'defaultSelectedRowExpanded',
            get: function get() {
                return this._defaultSelectedRowExpanded;
            },
            set: function set(defaultSelectedRowExpanded) {
                this._defaultSelectedRowExpanded = defaultSelectedRowExpanded;
            }
        }, {
            key: 'batchEditMode',
            get: function get() {
                return this._batchEditMode;
            },
            set: function set(batchEditMode) {
                this._batchEditMode = batchEditMode;
            }
        }, {
            key: 'stateFormatter',
            get: function get() {
                return this._stateFormatter;
            },
            set: function set(stateFormatter) {
                this._stateFormatter = stateFormatter;
            }
        }, {
            key: 'childRowsEnabled',
            get: function get() {
                return this._childRowsEnabled;
            },
            set: function set(childRowsEnabled) {
                this._childRowsEnabled = childRowsEnabled;
            }
        }, {
            key: 'childRowDetails',
            get: function get() {
                return this._childRowDetails;
            },
            set: function set(childRowDetails) {
                this._childRowDetails = childRowDetails;
            }
        }]);

        return RowDefinition;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/row-definition.js.map

gaRequire.define('tw-grid-advanced/pagination-settings',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var PaginationSettings = exports.PaginationSettings = function () {
        function PaginationSettings(enabled, pageLength, pagingType, pageLocation, totalPageButtons) {
            _classCallCheck(this, PaginationSettings);

            this._enabled = enabled !== undefined ? enabled : true;
            this._pageLength = pageLength !== undefined ? pageLength : 10;
            this._pagingType = pagingType !== undefined ? pagingType : 'simple_numbers';
            this._pageLocation = pageLocation !== undefined ? pageLocation : 'below';
            this._totalPageButtons = totalPageButtons >= 0 ? totalPageButtons : 5;
            this._totalPageButtons = this._totalPageButtons > 10 ? 10 : this._totalPageButtons;
        }

        PaginationSettings.prototype.validateFormat = function validateFormat(format) {};

        _createClass(PaginationSettings, [{
            key: 'enabled',
            get: function get() {
                return this._enabled;
            },
            set: function set(enabled) {
                this._enabled = enabled;
            }
        }, {
            key: 'pageLength',
            get: function get() {
                return this._pageLength;
            },
            set: function set(pageLength) {
                this._pageLength = pageLength;
            }
        }, {
            key: 'pagingType',
            get: function get() {
                return this._pagingType;
            },
            set: function set(pagingType) {
                this._pagingType = pagingType;
            }
        }, {
            key: 'pageLocation',
            get: function get() {
                return this._pageLocation;
            },
            set: function set(pageLocation) {
                this._pageLocation = pageLocation;
            }
        }, {
            key: 'totalPageButtons',
            get: function get() {
                return this._totalPageButtons;
            },
            set: function set(totalPageButtons) {
                this._totalPageButtons = totalPageButtons;
            }
        }]);

        return PaginationSettings;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/pagination-settings.js.map

gaRequire.define('tw-grid-advanced/search-settings',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var SearchSettings = exports.SearchSettings = function () {
        function SearchSettings(enabled, location, alignment) {
            _classCallCheck(this, SearchSettings);

            this._enabled = enabled !== undefined ? enabled : true;
            this._location = location !== undefined ? location : 'bottom';
            this._alignment = alignment !== undefined ? alignment : 'left';
        }

        SearchSettings.prototype.validateFormat = function validateFormat(format) {};

        _createClass(SearchSettings, [{
            key: 'enabled',
            get: function get() {
                return this._enabled;
            },
            set: function set(enabled) {
                this._enabled = enabled;
            }
        }, {
            key: 'location',
            get: function get() {
                return this._location;
            },
            set: function set(loc) {
                this._location = loc;
            }
        }, {
            key: 'alignment',
            get: function get() {
                return this._alignment;
            },
            set: function set(alignment) {
                this._alignment = alignment;
            }
        }]);

        return SearchSettings;
    }();
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/search-settings.js.map

gaRequire.define('tw-grid-advanced/mashup-builder-configuration-parser',['exports', './column-definition', './header-definition', './column-formatter-factory', '../../components/definitions/style-definition', '../../components/definitions/state-definition', './row-formatter', './row-definition', './pagination-settings', './configuration-parser', './logger', './search-settings'], function (exports, _columnDefinition, _headerDefinition, _columnFormatterFactory, _styleDefinition, _stateDefinition, _rowFormatter, _rowDefinition, _paginationSettings, _configurationParser, _logger, _searchSettings) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MashupBuilderConfigurationParser = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var MashupBuilderConfigurationParser = exports.MashupBuilderConfigurationParser = function (_ConfigurationParser) {
        _inherits(MashupBuilderConfigurationParser, _ConfigurationParser);

        function MashupBuilderConfigurationParser(configuration, styleResolver) {
            var localizationResolver = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (token) {
                return token;
            };
            var isTreeGrid = arguments[3];

            _classCallCheck(this, MashupBuilderConfigurationParser);

            var _this = _possibleConstructorReturn(this, _ConfigurationParser.call(this));

            _this._widget = configuration;

            _this._isTreeGrid = isTreeGrid;
            _this._styleResolver = styleResolver;
            _this._localizationResolver = localizationResolver;
            _this._gridAdvancedConfiguration.headerDefinition = _this._convertHeaderDefinition(configuration.getProperty('HeaderOverflow'), configuration.getProperty('MaxHeaderHeight'));
            _this._gridAdvancedConfiguration.columnDefinitions = _this._convertColumnDefinitions(configuration.getProperty('ColumnFormat'), configuration.getProperty('DataOverflow'), configuration);
            _this._gridAdvancedConfiguration.paginationSettings = _this._convertPaginationSettings(configuration);
            _this._gridAdvancedConfiguration.rowFormatter = _this._convertRowFormatter(configuration.getProperty('RowFormat'));
            _this._gridAdvancedConfiguration.rowDefinition = _this._convertRowDefinition(configuration);
            _this._gridAdvancedConfiguration.rowDefinition.defaultSelectedRows = _configurationParser.ConfigurationParser.convertDefaultSelectedRows(configuration.getProperty('DefaultSelectedRows'));
            _this._gridAdvancedConfiguration.styleDefinitions = _this._convertStyleDefinitions(configuration);

            _this._gridAdvancedConfiguration.splitColumnIndex = -1;
            _this._gridAdvancedConfiguration.resetButton = _this._convertResetButtonConfig(configuration);
            _this._gridAdvancedConfiguration.multiColumnSortOrder = _this._convertMultiColumnSortOrder(configuration.getProperty('MultiColumnSortOrder'));
            _this._gridAdvancedConfiguration.searchSettings = _this._createSearchSettings(configuration);
            _this._gridAdvancedConfiguration.maxRowCacheSize = configuration.getProperty('MaxRowCacheSize');
            _this._gridAdvancedConfiguration.parentIdFieldName = configuration.getProperty('ParentIDFieldName');
            _this._gridAdvancedConfiguration.idFieldName = configuration.getProperty('IDFieldName');
            _this._gridAdvancedConfiguration.hasChildrenFieldName = configuration.getProperty('HasChildrenFieldName');
            _this._gridAdvancedConfiguration.enableColumnSorting = configuration.getProperty('EnableSorting');
            _this._gridAdvancedConfiguration.selectedRow = configuration.getProperty('SelectedRow');
            _this._gridAdvancedConfiguration.expandAllLoadedLevels = configuration.getProperty('ExpandLoadedRows');
            _this._gridAdvancedConfiguration.includeRowExpansionParents = configuration.getProperty('IncludeRowExpansionParents');
            _this._gridAdvancedConfiguration.preserveRowExpansion = configuration.getProperty('PreserveRowExpansion');
			if(configuration.getProperty('EnableFiltering') == undefined) {
				_this._gridAdvancedConfiguration.enableTextFiltering = true;
			} else {
				_this._gridAdvancedConfiguration.enableTextFiltering = configuration.getProperty('EnableFiltering');
			}
			_this._gridAdvancedConfiguration.textFilteringType = configuration.getProperty('FilteringType') || "text_filter";
            return _this;
        }

        MashupBuilderConfigurationParser.prototype._createSearchSettings = function _createSearchSettings(config) {
            var searchSettings = void 0;
            if (config.getProperty('GridSearchLocation')) {
                var _config$getProperty$s = config.getProperty('GridSearchLocation').split('-'),
                    vertAlign = _config$getProperty$s[0],
                    align = _config$getProperty$s[1];

                searchSettings = new _searchSettings.SearchSettings(config.getProperty('EnableGridSearch'), vertAlign, align);
            } else {
                searchSettings = new _searchSettings.SearchSettings();
            }
            return searchSettings;
        };

        MashupBuilderConfigurationParser.prototype._convertPaginationSettings = function _convertPaginationSettings(configuration) {
            return new _paginationSettings.PaginationSettings(configuration.getProperty('ClientPagination'), configuration.getProperty('RowsPerPage'), configuration.getProperty('PaginationControls'), configuration.getProperty('PaginationLocation'), configuration.getProperty('PaginationButtons'));
        };

        MashupBuilderConfigurationParser.prototype._convertResetButtonConfig = function _convertResetButtonConfig(configuration) {
            var resetConfig = {};
            resetConfig.enabled = configuration.getProperty('EnableGridReset');
            resetConfig.location = configuration.getProperty('GridResetButtonLocation');
            return resetConfig;
        };

        MashupBuilderConfigurationParser.prototype._convertRowDefinition = function _convertRowDefinition(configuration) {
            var rowSelection = configuration.getProperty('RowSelection');
            var rowDefinition = new _rowDefinition.RowDefinition();
            rowDefinition.selection = rowSelection === 'list' ? 'none' : rowSelection;
            rowDefinition.minRowHeight = configuration.getProperty('MinRowHeight');
            rowDefinition.sizeImageToRow = configuration.getProperty('AutoSizeImagesToRow');
            rowDefinition.autoScroll = configuration.getProperty('AutoScroll');
            return rowDefinition;
        };

        MashupBuilderConfigurationParser.prototype._convertRowFormatter = function _convertRowFormatter(inputRowFormatter) {
            if (inputRowFormatter) {
                return new _rowFormatter.RowFormatter(this._convertStateDefinition(inputRowFormatter.StateDefinition, inputRowFormatter.StateDefinitionType, inputRowFormatter.FieldName, inputRowFormatter.StateFormats));
            }
            return null;
        };

        MashupBuilderConfigurationParser.prototype._convertStateDefinition = function _convertStateDefinition(inputStateDefinition, inputStateDefinitionType, fieldName, inputStateFormats) {
            var _this2 = this;

            var stateDef = new _stateDefinition.StateDefinition(inputStateDefinition, inputStateDefinitionType, fieldName);
            inputStateFormats.forEach(function (state) {
                stateDef.addState(state.stateName, state.value, state.comparator, _this2._convertStyleDefinition(state.state));
            });
            return stateDef;
        };

        MashupBuilderConfigurationParser.prototype._convertStyleDefinitions = function _convertStyleDefinitions(configuration) {
            var styles = {};
            styles.tableWrapperStyle = this._styleResolver(configuration.getProperty('TableWrapperStyle', 'DefaultTableWrapperStyle'));
            styles.tableHeaderStyle = this._styleResolver(configuration.getProperty('TableHeaderStyle', 'DefaultGridHeaderStyle'));
            styles.tableFocusStyle = this._styleResolver(configuration.getProperty('FocusStyle', 'DefaultFocusStyle'));

            styles.rowBorderStyle = this._styleResolver(configuration.getProperty('RowBorderStyle', 'DefaultRowBackgroundStyle'));
            styles.rowBackgroundStyle = this._styleResolver(configuration.getProperty('RowBackgroundStyle', 'DefaultRowBackgroundStyle'));
            styles.rowAlternateBackgroundStyle = this._styleResolver(configuration.getProperty('RowAlternateBackgroundStyle', 'DefaultRowAlternateBackgroundStyle'));
            styles.rowHoverStyle = this._styleResolver(configuration.getProperty('RowHoverStyle', 'DefaultRowHoverStyle'));
            styles.rowSelectedStyle = this._styleResolver(configuration.getProperty('RowSelectedStyle', 'DefaultRowSelectedStyle'));
            styles.cellBorderStyle = this._styleResolver(configuration.getProperty('CellBorderStyle', 'DefaultCellBorderStyle'));
            styles.paginationButtonStyle = this._styleResolver(configuration.getProperty('PaginationButtonStyle', 'DefaultPaginationButtonStyle'));
            styles.paginationHoverStyle = this._styleResolver(configuration.getProperty('PaginationHoverStyle', 'DefaultPaginationHoverStyle'));
            styles.paginationSelectedStyle = this._styleResolver(configuration.getProperty('PaginationSelectedStyle', 'DefaultPaginationSelectedStyle'));
            styles.tooltipStyle = this._styleResolver(configuration.getProperty('TooltipStyle', 'DefaultTooltipStyle'));
            styles.toolbarStyle = this._styleResolver(configuration.getProperty('ToolbarStyle', 'DefaultToolbarStyle'));
            styles.sortAscendingStyle = this._styleResolver(configuration.getProperty('SortAscendingStyle', 'DefaultSortAscendingStyle'));
            styles.sortDescendingStyle = this._styleResolver(configuration.getProperty('SortDescendingStyle', 'DefaultSortDescendingStyle'));
            return this.createStyleDefinitions(styles);
        };

        MashupBuilderConfigurationParser.prototype._convertStyleDefinition = function _convertStyleDefinition(styleName) {
            var style = void 0;
            if (styleName) {
                var styleDefinition = this._styleResolver(styleName);
                if (styleDefinition) {
                    style = new _styleDefinition.StyleDefinition(styleDefinition.displayString);
                    style.createFromConfig(styleDefinition);
                } else {
                    _logger.Logger.warn('Could not convert style definition "' + styleName + '"');
                }
            }
            return style;
        };

        MashupBuilderConfigurationParser.prototype._convertColumnDefinitions = function _convertColumnDefinitions(inputColumnDefs, overflow, widget) {
            var _this3 = this;

            var columnDefinitions = void 0;

            if (inputColumnDefs && inputColumnDefs.formatInfo) {
                columnDefinitions = [];
                inputColumnDefs.formatInfo.forEach(function (inputColumnDef, columnIndex) {
                    var columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter(inputColumnDef.FormatOptions.renderer, _this3._localizationResolver(inputColumnDef.FormatOptions.FormatString), { textFormat: inputColumnDef.FormatOptions.formatText }, widget);

                    if (inputColumnDef.FormatOptions.formatInfo && (inputColumnDef.FormatOptions.formatInfo.StateDefinition || inputColumnDef.FormatOptions.formatInfo.StateDefinitionType === 'fixed')) {
                        var formatInfo = inputColumnDef.FormatOptions.formatInfo;
                        columnFormatter.stateDefinition = new _stateDefinition.StateDefinition(formatInfo.StateDefinition, formatInfo.StateDefinitionType, formatInfo.FieldName);
                        inputColumnDef.FormatOptions.formatInfo.StateFormats.forEach(function (state) {
                            var styleDefinition = _this3._convertStyleDefinition(state.state);
                            if (styleDefinition) {
                                columnFormatter.stateDefinition.addState(state.stateName, state.value, state.comparator, styleDefinition);
                            }
                        });
                    }
                    var columnDefinition = new _columnDefinition.ColumnDefinition(columnIndex, inputColumnDef.FieldName, inputColumnDef.Title, columnFormatter);
                    columnDefinition.hidden = inputColumnDef.hidden !== undefined ? inputColumnDef.hidden : false;
                    columnDefinition.inLayout = inputColumnDef.inLayout !== undefined ? inputColumnDef.inLayout : true;
                    columnDefinition.overflow = inputColumnDef.overflow !== undefined ? inputColumnDef.overflow : overflow;

                    if (inputColumnDef.Width === 'auto') {
                        columnDefinition.autoWidth = true;
                    } else {
                        columnDefinition.autoWidth = false;
                        columnDefinition.width = inputColumnDef.Width;
                        if (columnDefinition.width.indexOf('px') === -1 && columnDefinition.width.indexOf('%') === -1) {
                            columnDefinition.width += 'px';
                        }
                    }
                    columnDefinition.textAlignment = inputColumnDef.Align.toLowerCase();
                    columnDefinition.headerTextAlignment = inputColumnDef.headerTextAlignment;
                    columnDefinitions.push(columnDefinition);
                });
            }
            return columnDefinitions;
        };

        MashupBuilderConfigurationParser.prototype._convertHeaderDefinition = function _convertHeaderDefinition(overflow, maxHeight) {
            var headerDef = new _headerDefinition.HeaderDefinition();
            headerDef.overflow = overflow;
            headerDef.maxHeight = maxHeight;
            return headerDef;
        };

        MashupBuilderConfigurationParser.prototype._convertMultiColumnSortOrder = function _convertMultiColumnSortOrder(configuration) {
            var _this4 = this;

            var multiColumnSort = [];
            if (configuration && configuration.length > 0) {
                configuration.split(',').forEach(function (element) {
                    if (element.indexOf(':') > -1) {
                        var sort = element.split(':');
                        if (sort[0] && sort[0].length > 0 && sort[1] && sort[1].length > 0) {
                            var id = sort[0].trim();
                            var direction = sort[1].trim().toLowerCase();
                            if (direction !== 'asc' && direction !== 'des') {
                                console.warn('Invalid "MultiColumnSortOrder" direction string "' + sort[1] + '". Supported ' + 'settings are "asc" or "des".');
                            } else if (_this4._gridAdvancedConfiguration.columnDefinitions && _this4._gridAdvancedConfiguration.columnDefinitions.length > 0 && !_this4._gridAdvancedConfiguration.hasColumnDefinition(id)) {
                                console.warn('Invalid "MultiColumnSortOrder" column id "' + sort[0] + '". Needs to match a ' + '"fieldName" in the configuration');
                            } else {
                                var columnSort = {
                                    id: id,
                                    direction: direction
                                };
                                multiColumnSort.push(columnSort);
                            }
                        } else {
                            console.warn('Invalid "MultiColumnSortOrder" string "' + configuration + '". Example: "1:asc,2:des"');
                        }
                    } else {
                        console.warn('Invalid "MultiColumnSortOrder" string "' + configuration + '". Example: "1:asc,2:des"');
                    }
                });
            }
            return multiColumnSort;
        };

        return MashupBuilderConfigurationParser;
    }(_configurationParser.ConfigurationParser);
});
//# sourceMappingURL=../../maps/advanced-widgets/grid-advanced/mashup-builder-configuration-parser.js.map

gaRequire.define('tw-grid-advanced/tooltip/tooltip-factory',['exports', './default-tooltip', './thingworx-tooltip', './mashup-builder-tooltip'], function (exports, _defaultTooltip, _thingworxTooltip, _mashupBuilderTooltip) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TooltipFactory = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TooltipFactory = exports.TooltipFactory = function () {
        function TooltipFactory() {
            _classCallCheck(this, TooltipFactory);
        }

        TooltipFactory.getTooltip = function getTooltip(type) {
            switch (type) {
                case 'mashup-builder':
                    return _mashupBuilderTooltip.MashupBuilderTooltip;
                case 'thingworx':
                    return _thingworxTooltip.ThingworxTooltip;
                default:
                    return _defaultTooltip.DefaultTooltip;
            }
        };

        return TooltipFactory;
    }();
});
//# sourceMappingURL=../../../maps/advanced-widgets/grid-advanced/tooltip/tooltip-factory.js.map

gaRequire.define('tw-grid-advanced/tooltip/thingworx-tooltip',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var ThingworxTooltip = exports.ThingworxTooltip = function () {
        function ThingworxTooltip() {
            _classCallCheck(this, ThingworxTooltip);
        }

        ThingworxTooltip.setTooltip = function setTooltip(tooltip, element) {};

        return ThingworxTooltip;
    }();
});
//# sourceMappingURL=../../../maps/advanced-widgets/grid-advanced/tooltip/thingworx-tooltip.js.map

gaRequire.define('tw-grid-advanced/tooltip/mashup-builder-tooltip',['exports', 'jquery'], function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MashupBuilderTooltip = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var MashupBuilderTooltip = exports.MashupBuilderTooltip = function () {
        function MashupBuilderTooltip() {
            _classCallCheck(this, MashupBuilderTooltip);
        }

        MashupBuilderTooltip.setTooltip = function setTooltip(tooltip, element, widgetId) {
            var $element = (0, _jquery2.default)(element);
            var $tiptipHolder = void 0;
            if (tooltip !== undefined && tooltip.length > 0 && $element.tipTip !== undefined) {
                if ($element.data('tiptip') !== true) {
                    $element.tipTip({
                        maxWidth: 'auto',
                        edgeOffset: 0,
                        content: tooltip,
                        enter: function enter() {
                            setTimeout(function () {
                                $tiptipHolder = (0, _jquery2.default)('#tiptip_holder');
                                $tiptipHolder.addClass(widgetId);
                            });
                        },
                        exit: function exit() {
                            setTimeout(function () {
                                if (!$tiptipHolder.is(':visible')) {
                                    $tiptipHolder.removeClass(widgetId);
                                }
                            });
                        }
                    });
                    $element.data('tiptip', true);
                    $element.trigger('mouseenter');
                }
            }
        };

        return MashupBuilderTooltip;
    }();
});
//# sourceMappingURL=../../../maps/advanced-widgets/grid-advanced/tooltip/mashup-builder-tooltip.js.map
