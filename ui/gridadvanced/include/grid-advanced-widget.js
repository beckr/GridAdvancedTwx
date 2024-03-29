gaRequire.define('tw-grid-advanced/grid-advanced/grid-advanced-wrapper',['exports', './tw-grid-advanced', './configuration-parser-factory', './tooltip/tooltip-factory', 'lodash-amd'], function (exports, _twGridAdvanced, _configurationParserFactory, _tooltipFactory, _lodashAmd) {
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
//# sourceMappingURL=../maps/grid-advanced/grid-advanced-wrapper.js.map
;gaRequire.define('tw-grid-advanced', ['tw-grid-advanced/grid-advanced/grid-advanced-wrapper'], function (main) { return main; });

gaRequire.define('tw-grid-advanced/grid-advanced/cell-editor',['exports'], function (exports) {
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

    var COLUMN_TYPE_NUMBER = 'number';
    var COLUMN_TYPE_LONG = 'long';
    var COLUMN_TYPE_INTEGER = 'integer';
    var COLUMN_TYPE_STRING = 'string';
    var COLUMN_TYPE_BOOLEAN = 'boolean';
    var COLUMN_TYPE_IMAGELINK = 'imagelink';
    var COLUMN_TYPE_HYPERLINK = 'hyperlink';
    var COLUMN_TYPE_LOCATION = 'location';
    var COLUMN_TYPE_HTML = 'html';
    var COLUMN_TYPE_DATETIME = 'datetime';

    var CellEditor = exports.CellEditor = function () {
        function CellEditor() {
            var columnFormatterType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'string';
            var isEnabled = arguments[1];
            var cellValidator = arguments[2];

            _classCallCheck(this, CellEditor);

            this._columnFormatterType = columnFormatterType;
            this._isEnabled = isEnabled;
            this._cellValidator = cellValidator;
        }

        CellEditor.prototype.getColumnType = function getColumnType() {
            var editMode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var type = void 0;
            if (editMode === false) {
                if (this._columnFormatterType === COLUMN_TYPE_NUMBER) {
                    type = 'ron';
                } else if (this._columnFormatterType === COLUMN_TYPE_INTEGER) {
                    type = 'ron';
                } else if (this._columnFormatterType === COLUMN_TYPE_LONG) {
                    type = 'ron';
                } else {
                    type = 'ro';
                }
            } else if (this._columnFormatterType === COLUMN_TYPE_BOOLEAN) {
                type = 'ch';
            } else if (this._columnFormatterType === COLUMN_TYPE_LOCATION) {
                type = 'edtxt';
            } else if (this._columnFormatterType === COLUMN_TYPE_DATETIME) {
                type = 'dhxCalendar';
            } else if (this._columnFormatterType === COLUMN_TYPE_NUMBER) {
                type = 'edn';
            } else if (this._columnFormatterType === COLUMN_TYPE_INTEGER) {
                type = 'edn';
            } else if (this._columnFormatterType === COLUMN_TYPE_LONG) {
                type = 'edn';
            } else if (this._columnFormatterType === COLUMN_TYPE_IMAGELINK) {
                type = 'edtxt';
            } else if (this._columnFormatterType === COLUMN_TYPE_HYPERLINK) {
                type = 'edtxt';
            } else if (this._columnFormatterType === COLUMN_TYPE_HTML) {
                type = 'ed';
            } else if (this._columnFormatterType === COLUMN_TYPE_STRING) {
                type = 'edtxt';
            } else {
                type = 'ro';
            }
            return type;
        };

        _createClass(CellEditor, [{
            key: 'columnFormatterType',
            get: function get() {
                return this._columnFormatterType;
            }
        }, {
            key: 'isEnabled',
            get: function get() {
                return this._isEnabled;
            }
        }, {
            key: 'cellValidator',
            get: function get() {
                return this._cellValidator;
            }
        }]);

        return CellEditor;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/cell-editor.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/cell-validator',["exports"], function (exports) {
  "use strict";

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

  var CellValidator = exports.CellValidator = function () {
    function CellValidator(isLiveValidationEnabled, types, successMessageTokenName, errorMessageTokenName, successMessageStyleName, errorMessageStyleName) {
      _classCallCheck(this, CellValidator);

      this._isLiveValidationEnabled = isLiveValidationEnabled;
      this._types = types;
      this._successMessageTokenName = successMessageTokenName;
      this._errorMessageTokenName = errorMessageTokenName;
      this._successMessageStyleName = successMessageStyleName;
      this._errorMessageStyleName = errorMessageStyleName;
    }

    _createClass(CellValidator, [{
      key: "isLiveValidationEnabled",
      get: function get() {
        return this._isLiveValidationEnabled;
      }
    }, {
      key: "type",
      get: function get() {
        return this._types;
      }
    }, {
      key: "cellSuccessMessageTokenName",
      get: function get() {
        return this._successMessageTokenName;
      }
    }, {
      key: "cellErrorMessageTokenName",
      get: function get() {
        return this._errorMessageTokenName;
      }
    }, {
      key: "cellSuccessMessageStyleName",
      get: function get() {
        return this._successMessageStyleName;
      }
    }, {
      key: "cellErrorMessageStyleName",
      get: function get() {
        return this._errorMessageStyleName;
      }
    }]);

    return CellValidator;
  }();
});
//# sourceMappingURL=../maps/grid-advanced/cell-validator.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/child-grid-handler',['exports', 'jquery', './logger', './performance-monitor'], function (exports, _jquery, _logger, _performanceMonitor) {
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

    var ChildGridHandler = exports.ChildGridHandler = function () {
        function ChildGridHandler(gridId, gridAdvanced, dhtmlxTableData, serviceInvoker, parameters, configuration) {
            var callback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

            _classCallCheck(this, ChildGridHandler);

            this._gridId = gridId;
            this._gridAdvanced = gridAdvanced;
            this._dhtmlxTableData = dhtmlxTableData;
            this._serviceInvoker = serviceInvoker;
            this._cfg = configuration;
            this._callback = callback;
            this._defaultParams = parameters;

            this._performanceMonitor = new _performanceMonitor.PerformanceMonitor(false);
        }

        ChildGridHandler.prototype.expandChildGrid = function expandChildGrid(rowId) {
            var _this = this;

            var query = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _rowId = this._getRowId(rowId);
            this._performanceMonitor.startTime('loadChildGrid-' + _rowId);
            var gridRow = this._dhtmlxTableData.getRowById(_rowId);
            if (!gridRow.childrenLoaded) {
                if (this._serviceInvoker) {
                    this._setTreeLoadingIcon(_rowId);
                    var params = {
                        query: query.query,
                        includesParents: false
                    };
                    params[this._cfg.idFieldName] = _rowId;

                    this._serviceInvoker.parameters = _jquery2.default.extend({ maxLevels: 1 }, this._defaultParams, params);
                    this._serviceInvoker.invokeService(function (invoker) {
                        if (invoker && invoker.result) {
                            _this._createTableData(invoker.result.rows, _rowId);
                        }
                    }, function (message) {
                        _logger.Logger.error(message);
                    });
                }
            } else if (!gridRow.isExpanded) {
                gridRow.isExpanded = true;
                this._gridAdvanced.openItem(rowId);
            }
        };

        ChildGridHandler.prototype.expandPath = function expandPath(rowId, isRowSelection) {
            var _this2 = this;

            if (rowId && rowId.trim().length > 0) {
                var lastParentId = void 0;
                if (this._cfg.includeRowExpansionParents) {
                    lastParentId = this._dhtmlxTableData.findLastLoadedParentId(rowId);
                    rowId = this._dhtmlxTableData.getLeafId(rowId);
                }
                if (this._dhtmlxTableData.getRowById(rowId) !== undefined) {
                    var parentId = void 0;
                    if (isRowSelection) {
                        parentId = this._gridAdvanced.getParentId(this._getRowId(rowId));
                    }
                    this._gridAdvanced.openItem(parentId);
                    var gridRow = this._dhtmlxTableData.getRowById(rowId);
                    if (gridRow) {
                        gridRow.isExpanded = true;
                        this._autoScrollToRow(rowId);
                    }
                } else if (this._serviceInvoker) {
                    var state = this._gridAdvanced.getStateOfView();
                    var topRowId = this._gridAdvanced.getRowId(state[0]);
                    this._setTreeLoadingIcon(topRowId);
                    var params = {
                        maxLevels: 25,
                        leafId: rowId
                    };
                    if (this._cfg.includeRowExpansionParents) {
                        params[this._cfg.idFieldName] = lastParentId;
                    }
                    this._serviceInvoker.parameters = _jquery2.default.extend({}, this._defaultParams, params);
                    this._serviceInvoker.invokeService(function (invoker) {
                        if (invoker && invoker.result) {
                            var rows = invoker.result.rows.filter(_this2._filterLoadedRows.bind(_this2));
                            _this2._expandTableData(rows, rowId, topRowId, isRowSelection);
                        }
                    }, function (message) {
                        _logger.Logger.error(message);
                    });
                }
            }
        };

        ChildGridHandler.prototype._filterLoadedRows = function _filterLoadedRows(row) {
            return this._gridAdvanced.getRowIndex(row[this._cfg.idFieldName]) === -1;
        };

        ChildGridHandler.prototype._setTreeLoadingIcon = function _setTreeLoadingIcon(parentId) {
            (0, _jquery2.default)('#' + this._gridId + '-spinner').show();
        };

        ChildGridHandler.prototype.collapseChildGrid = function collapseChildGrid(rowId) {
            var _this3 = this;

            var clearCache = this._dhtmlxTableData.hasRowExpired(rowId, this._gridAdvanced.getRowsNum());
            this._rowId = this._getRowId(rowId);
            var gridRow = this._dhtmlxTableData.getRowById(rowId);
            if (this._gridAdvanced.getOpenState(rowId)) {
                this._gridAdvanced.closeItem(rowId);
            }
            gridRow.isExpanded = false;

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
            this._resetSpinner();
            var gridRow = this._dhtmlxTableData.getRowById(rowId);
            if (gridRow) {
                gridRow.isExpanded = true;
                gridRow.childrenLoaded = true;
                this._autoScrollToRow(rowId);
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

                this._resetSpinner();
                this._gridAdvanced.openItem(gridRow[this._cfg.idFieldName]);
                if (gridRow) {
                    gridRow.isExpanded = true;
                    this._autoScrollToRow(rowId);
                }
                this._callback();
            } else {
                this._resetSpinner();
            }

            this._performanceMonitor.endTime('createDataTable-' + rowId);
        };

        ChildGridHandler.prototype._getRowId = function _getRowId(rowId) {
            var id = rowId;
            if (rowId.indexOf(this._cfg.idPathSeparator) > -1) {
                var ids = rowId.split(this._cfg.idPathSeparator);
                id = ids[ids.length - 1];
            }
            return id;
        };

        ChildGridHandler.prototype._resetSpinner = function _resetSpinner() {
            (0, _jquery2.default)('#' + this._gridId + '-spinner').hide();
        };

        ChildGridHandler.prototype._autoScrollToRow = function _autoScrollToRow(rowId) {
            if (this._cfg.rowDefinition.autoScroll && rowId && this._gridAdvanced.getRowIndex(rowId) > -1) {
                this._gridAdvanced.showRow(rowId);
            }
        };

        return ChildGridHandler;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/child-grid-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/column-definition',['exports', './components/definitions/footer-definition'], function (exports, _footerDefinition) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.ColumnDefinition = undefined;

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

    var ColumnDefinition = exports.ColumnDefinition = function () {
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
                this._allowsTooltips = columnFormatter.valueConverter.allowTooltip;
            }
            this._inLayout = true;
        }

        ColumnDefinition.prototype.render = function render(rawValue, stateData, editMode) {
            var renderCell = { value: rawValue };
            if (this._columnFormatter) {
                renderCell.value = this._columnFormatter.formatValue(rawValue, stateData, editMode);
                renderCell.columnType = this._columnFormatter.cellEditor.getColumnType(editMode);
            }
            return renderCell;
        };

        ColumnDefinition.prototype.isCheckboxFormatter = function isCheckboxFormatter() {
            return this._columnFormatter && this._columnFormatter.valueConverter && this._columnFormatter.valueConverter.type === 'boolean' && this._columnFormatter.valueConverter.valueFormat === 'checkbox';
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
            key: 'footerDefinition',
            get: function get() {
                return this._footerDefinition;
            },
            set: function set(footerDefinition) {
                this._footerDefinition = footerDefinition;
            }
        }, {
            key: 'allowsTooltips',
            get: function get() {
                return this._allowsTooltips && this.overflow === 'tooltip';
            }
        }]);

        return ColumnDefinition;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/column-definition.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/column-formatter-factory',['exports', './column-formatter', './components/renderers/string-renderer', './components/renderers/integer-renderer', './components/renderers/long-renderer', './components/renderers/boolean-renderer', './components/renderers/datetime-renderer', './components/renderers/html-renderer', './components/renderers/imagelink-renderer', './components/renderers/number-renderer', './components/renderers/hyperlink-renderer', './components/renderers/location-renderer', './components/renderers/default-renderer'], function (exports, _columnFormatter, _stringRenderer, _integerRenderer, _longRenderer, _booleanRenderer, _datetimeRenderer, _htmlRenderer, _imagelinkRenderer, _numberRenderer, _hyperlinkRenderer, _locationRenderer, _defaultRenderer) {
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

        ColumnFormatterFactory.getFormatter = function getFormatter(type, valueFormat, params, cellEditor) {

            var converter = void 0;
            switch (type.toLowerCase()) {
                case 'string':
                    converter = new _stringRenderer.StringRenderer(valueFormat, params);
                    break;
                case 'integer':
                    converter = new _integerRenderer.IntegerRenderer(valueFormat, params);
                    break;
                case 'long':
                    converter = new _longRenderer.LongRenderer(valueFormat, params);
                    break;
                case 'boolean':
                    converter = new _booleanRenderer.BooleanRenderer(valueFormat, params);
                    break;
                case 'number':
                    converter = new _numberRenderer.NumberRenderer(type.toLowerCase(), valueFormat, params);
                    break;
                case 'datetime':
                    converter = new _datetimeRenderer.DatetimeRenderer(valueFormat, params);
                    break;
                case 'html':
                    converter = new _htmlRenderer.HtmlRenderer(valueFormat, params);
                    break;
                case 'imagelink':
                    converter = new _imagelinkRenderer.ImagelinkRenderer(valueFormat, params);
                    break;
                case 'hyperlink':
                    converter = new _hyperlinkRenderer.HyperlinkRenderer(valueFormat, params);
                    break;
                case 'location':
                    converter = new _locationRenderer.LocationRenderer(valueFormat, params);
                    break;
                default:
                    converter = new _defaultRenderer.DefaultRenderer('string', valueFormat, params);
            }
            return new _columnFormatter.ColumnFormatter(converter, cellEditor);
        };

        return ColumnFormatterFactory;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/column-formatter-factory.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/column-formatter',['exports'], function (exports) {
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
        function ColumnFormatter(valueConverter, cellEditor) {
            _classCallCheck(this, ColumnFormatter);

            this._valueConverter = valueConverter;
            this._cellEditor = cellEditor;
        }

        ColumnFormatter.prototype.getColumnStyles = function getColumnStyles(value) {
            var styles = '';
            if (value !== undefined) {
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

        ColumnFormatter.prototype.formatValue = function formatValue(rawValue, stateData, editMode) {
            return this._valueConverter ? this._valueConverter.toView(rawValue, editMode, this._getImageLink(stateData)) : rawValue;
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
        }, {
            key: 'cellEditor',
            set: function set(cellEditor) {
                this._cellEditor = cellEditor;
            },
            get: function get() {
                return this._cellEditor;
            }
        }]);

        return ColumnFormatter;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/column-formatter.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/column-sort-handler',['exports', 'jquery', 'lodash-amd', './components/renderers/string-renderer', './components/renderers/boolean-renderer', './components/renderers/datetime-renderer', './components/renderers/number-renderer', './components/renderers/html-renderer', './components/renderers/hyperlink-renderer'], function (exports, _jquery, _lodashAmd, _stringRenderer, _booleanRenderer, _datetimeRenderer, _numberRenderer, _htmlRenderer, _hyperlinkRenderer) {
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
                        } else if (valueConverter instanceof _stringRenderer.StringRenderer || valueConverter instanceof _booleanRenderer.BooleanRenderer || valueConverter instanceof _hyperlinkRenderer.HyperlinkRenderer || valueConverter instanceof _htmlRenderer.HtmlRenderer) {
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
//# sourceMappingURL=../maps/grid-advanced/column-sort-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/configuration-parser-factory',['exports', './logger', './json-configuration-parser', './mashup-builder-configuration-parser'], function (exports, _logger, _jsonConfigurationParser, _mashupBuilderConfigurationParser) {
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
//# sourceMappingURL=../maps/grid-advanced/configuration-parser-factory.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/configuration-parser',['exports', './grid-advanced-configuration', './components/definitions/style-definition', './logger', 'lodash-amd'], function (exports, _gridAdvancedConfiguration, _styleDefinition, _logger, _lodashAmd) {
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
//# sourceMappingURL=../maps/grid-advanced/configuration-parser.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/dhtmlx-table-data',['exports', 'lodash-amd', './logger', './grid-row'], function (exports, _lodashAmd, _logger, _gridRow) {
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
            this._footers = [];
            this._allColumnsMap = new Map();
            this._headers = '';
            this._cfg = cfg;
            this._rowIdMap = new Map();
            this._editedRowMap = new Map();
            this._data = this.orderData(rows);
            this._filterCacheTimestamp = 0;
            this._treeColumnEditable = false;
        }

        DhtmlxTableData.prototype.createIdPath = function createIdPath(rowId) {
            var idPath = rowId;
            var gridRow = this.getRowById(rowId);
            return this._appendParentId(idPath, gridRow);
        };

        DhtmlxTableData.prototype.getLeafId = function getLeafId(pathId) {
            var id = pathId;
            if (pathId !== undefined && pathId.indexOf(this._cfg.idPathSeparator) > -1) {
                var ids = pathId.split(this._cfg.idPathSeparator);
                id = ids[ids.length - 1];
            }
            return id;
        };

        DhtmlxTableData.prototype.findLastLoadedParentId = function findLastLoadedParentId(pathId) {
            var _this = this;

            var lastParentId = pathId;
            if (pathId !== undefined && pathId.indexOf(this._cfg.idPathSeparator) > -1) {
                var ids = pathId.split(this._cfg.idPathSeparator);
                ids.forEach(function (id) {
                    if (_this._rowIdMap.has(id)) {
                        lastParentId = id;
                    }
                });
            }
            return lastParentId;
        };

        DhtmlxTableData.prototype._appendParentId = function _appendParentId(idPath, gridRow) {
            idPath = gridRow.parent !== undefined ? gridRow.parent + this._cfg.idPathSeparator + idPath : idPath;
            var parentRow = this.getRowById(gridRow.parent);
            if (parentRow !== undefined) {
                idPath = this._appendParentId(idPath, parentRow);
            }
            return idPath;
        };

        DhtmlxTableData.prototype.cacheEditedRow = function cacheEditedRow(rowId, columnName, newValue) {
            var gridRow = this.getRowById(rowId);
            var rawDataCellIndex = this._allColumnsMap.get(columnName);
            var oldValue = gridRow.rawData[rawDataCellIndex];
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef.columnFormatter && columnDef.columnFormatter.valueConverter) {
                newValue = columnDef.columnFormatter.valueConverter.parseValue(oldValue, newValue);
            }
            if (newValue !== undefined && _lodashAmd2.default.isEqual(oldValue, newValue) === false) {
                gridRow.rawData[rawDataCellIndex] = newValue;
                this._editedRowMap.set(rowId, gridRow);
                return true;
            }
            return false;
        };

        DhtmlxTableData.prototype.updateEditedInfoTableRows = function updateEditedInfoTableRows() {
            var _this2 = this;

            var rows = [];
            this._editedRowMap.forEach(function (gridRow) {
                var row = {};
                _this2._allColumns.forEach(function (column, index) {
                    row[column] = gridRow.rawData[index];
                });
                rows.push(row);
            });
            return rows;
        };

        DhtmlxTableData.prototype.clearEditedInfoTableRows = function clearEditedInfoTableRows() {
            this._editedRowMap.clear();
        };

        DhtmlxTableData.prototype.findColumnIndex = function findColumnIndex(columnName) {
            return _lodashAmd2.default.findIndex(this._allColumns, function (name) {
                return name === columnName;
            });
        };

        DhtmlxTableData.prototype.resetFormatted = function resetFormatted() {
            this._rowIdMap.forEach(function (gridRow, id) {
                gridRow.isFormatted = false;
            });
        };

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
            var _this3 = this;

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
                    if (_this3._cfg) {
                        if (!_this3._cfg.hasColumnDefinition(key)) {
                            updated = _lodashAmd2.default.omit(updated, key);
                        }
                    }
                });
            }
            return updated;
        };

        DhtmlxTableData.prototype.orderData = function orderData(data, parentId) {
            var _this4 = this;

            var expandRows = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            var updatedRows = [];
            var newData = [];
            var tree = {};
            var orderedColumns = void 0;
            var cacheTimestamp = new Date().getTime();

            data.forEach(function (row, index) {
                var rowId = _this4._createRowId(parentId, row, index);
                var myParentId = _lodashAmd2.default.get(row, _this4._cfg.parentIdFieldName);
                var hasChildren = _this4._hasChildren(row);

                row = _this4._removePrivateColumns(row);
                var rawValues = _lodashAmd2.default.values(row);
                var values = _this4._removeNotInLayoutColumns(_this4._cfg, row);
                if (index === 0) {
                    _this4._createHeaders(_lodashAmd2.default.keys(row));
                    orderedColumns = _this4._determineColumnOrder();
                }
                if (_this4._cfg.expandAllLoadedLevels === true && hasChildren) {
                    expandRows = true;
                }
                _this4._setNodeIcon(orderedColumns[0], values, hasChildren);

                var gridRow = new _gridRow.GridRow(rowId, myParentId, values, rawValues, hasChildren, expandRows, cacheTimestamp, index);
                tree[rowId] = gridRow;
                newData[index] = gridRow;
                _this4._rowIdMap.set(gridRow.id, gridRow);
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

        DhtmlxTableData.prototype.orderFooterData = function orderFooterData(data) {
            var _this5 = this;

            var footerValues = [];
            var footerColumns = [];
            data.forEach(function (row, index) {
                footerValues[index] = _lodashAmd2.default.values(row);
                footerColumns[index] = _lodashAmd2.default.keys(row);
            });
            if (footerValues && footerValues.length > 0) {
                footerValues.forEach(function (values, fIndex) {
                    var settings = '';
                    var alignments = [];
                    if (_this5._cfg && _this5._cfg.columnDefinitions) {
                        _this5._columns.forEach(function (column, index) {
                            var cIndex = _lodashAmd2.default.findIndex(footerColumns[fIndex], function (fColumn) {
                                return column === fColumn;
                            });
                            var footer = values[cIndex];
                            var commaIndex = -1;
                            var leftAlignment = 'text-align:left;';
                            var alignment = leftAlignment;
                            if (footer !== undefined && (commaIndex = footer.indexOf(',')) > -1) {
                                var parts = footer.split(',');
                                if (parts.length > 0) {
                                    footer = parts[0].trim();
                                }
                                alignment = parts.length === 2 ? parts[1].trim() : leftAlignment;
                                if (alignment !== 'text-align:left;' && alignment !== 'text-align:right;') {
                                    _logger.Logger.warn('Invalid footer alignment value: ' + alignment + '. Valid values are "text-align:left;" or "text-align:right;".');
                                    alignment = leftAlignment;
                                }
                            }
                            var match = void 0;
                            if (footer !== undefined && (match = footer.match(/\[\[\w*\]\]/g)) !== null) {
                                match.forEach(function (token) {
                                    var l8n = _this5._localizationUtil(token);
                                    l8n = l8n === ',' ? '&#44;' : l8n;
                                    footer = footer.replace(token, l8n);
                                });
                            }
                            alignments[index] = alignment;
                            settings += footer !== undefined && footer.length > 0 ? footer + ',' : ',';
                        });
                    }
                    _this5._footers[fIndex] = { settings: settings, alignments: alignments };
                });
            }
        };

        DhtmlxTableData.prototype._hasChildren = function _hasChildren(row) {
            var value = _lodashAmd2.default.get(row, this._cfg.hasChildrenFieldName);
            return value && value != '0' && value != '0.0' && value != 'undefined' && value !== '' && value != 'false';
        };

        DhtmlxTableData.prototype._createRowId = function _createRowId(parentId, row, index) {
            var rowId = _lodashAmd2.default.get(row, this._cfg.idFieldName);
            if (!rowId) {
                rowId = index + 1;
                if (parentId) {
                    rowId = parentId + '_' + rowId;
                }
            }

            rowId += '';
            if (rowId === '0') {
                _logger.Logger.error('Cannot have an id of zero');
            }
            return rowId;
        };

        DhtmlxTableData.prototype._createHeaders = function _createHeaders(keys) {
            var _this6 = this;

            this._headers = '';
            this._allColumns = [];
            this._columns = [];
            keys.forEach(function (column, index) {
                if (_this6._cfg) {
                    if (!_this6._cfg.hasColumnDefinition(column)) {
                        _this6._cfg.addColumnDefinition(column, column, undefined, false);
                    }
                    var columnDef = _this6._cfg.findColumnDefinition(column);
                    _this6._allColumns.push(column);
                    _this6._allColumnsMap.set(column, index);
                    if (columnDef && columnDef.inLayout) {
                        _this6._columns.push(column);
                        var title = columnDef.title ? columnDef.title : column;
                        title = _this6._cfg.headerDefinition ? _this6._cfg.headerDefinition.formatTitle(title) : title;
                        if (_this6._localizationUtil) {
                            title = _this6._localizationUtil(title);
                        }
                        _this6._headers += _this6._headers.length === 0 ? title : ',' + title;
                    }
                }
            });
        };

        DhtmlxTableData.prototype._removeNotInLayoutColumns = function _removeNotInLayoutColumns(cfg, row) {
            var myRow = _lodashAmd2.default.cloneDeep(row);
            if (cfg) {
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
            }
            return _lodashAmd2.default.values(myRow);
        };

        DhtmlxTableData.prototype.getRowById = function getRowById(rowId) {
            return this._rowIdMap.get(rowId);
        };

        DhtmlxTableData.prototype.removeRowById = function removeRowById(rowId) {
            this._rowIdMap.delete(rowId);
        };

        DhtmlxTableData.prototype.hasRowExpired = function hasRowExpired(rowId, totalRows) {
            var rowExpired = totalRows > this._cfg.maxRowCacheSize;
            var row = this.getRowById(rowId);
            if (!rowExpired && row && row.rows.length > 0) {
                rowExpired = row.rows[0].createdAt < this.cacheTimestamp;
            }

            return rowExpired;
        };

        DhtmlxTableData.prototype.findColumnIndex = function findColumnIndex(columnName) {
            return _lodashAmd2.default.findIndex(this._allColumns, function (column) {
                return column === columnName;
            });
        };

        DhtmlxTableData.prototype._determineColumnOrder = function _determineColumnOrder(cookieConfig) {
            var _this7 = this;

            var myColumns = _lodashAmd2.default.cloneDeep(this._columns);

            if (cookieConfig) {
                cookieConfig.columnOrder.forEach(function (columnIndex, toIndex) {
                    var columnId = _this7._columns[columnIndex];
                    _this7._moveColumns(columnId, toIndex, myColumns);
                });
            } else if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDef) {
                    if (columnDef.inLayout) {
                        _this7._moveColumns(columnDef.fieldName, columnDef.columnIndex, myColumns);
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

        DhtmlxTableData.prototype.createColumnTypes = function createColumnTypes(isTreeGrid, editingEnabled) {
            var _this8 = this;

            var types = '';
            var columns = this._determineColumnOrder();
            if (this._cfg && this._cfg.columnDefinitions) {
                this.columns.forEach(function (column, index) {
                    var columnDef = _this8._cfg.findColumnDefinition(column);
                    if (columnDef.columnFormatter && columnDef.columnFormatter.cellEditor) {
                        var cellEditor = columnDef.columnFormatter.cellEditor;
                        if (column === columns[0] && isTreeGrid) {
                            _this8._treeColumnEditable = cellEditor.isEnabled;
                            types += types.length === 0 ? 'tree' : ',tree';
                        } else {
                            var editable = false;
                            if (columnDef.columnFormatter.valueConverter.type === 'boolean' && columnDef.columnFormatter.valueConverter.valueFormat === 'checkbox') {
                                editable = editingEnabled && cellEditor.isEnabled;
                            }
                            var columnType = cellEditor.getColumnType(editable);
                            types += types.length === 0 ? columnType : ',' + columnType;
                        }
                    } else {
                        types += types.length === 0 ? 'ro' : ',ro';
                    }
                });
            }
            return types;
        };

        DhtmlxTableData.prototype.createColumnMoveSettings = function createColumnMoveSettings(isTreeGrid) {
            var _this9 = this;

            var settings = '';
            var columns = this._determineColumnOrder();
            if (this._cfg && this._cfg.columnDefinitions) {
                this.columns.forEach(function (column, index) {
                    var columnDef = _this9._cfg.findColumnDefinition(column);
                    if (column === columns[0] && isTreeGrid) {
                        settings += settings.length === 0 ? 'false' : ',false';
                    } else {
                        settings += settings.length === 0 ? 'true' : ',true';
                    }
                });
            }
            return settings;
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
            key: 'footers',
            get: function get() {
                return this._footers;
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
        }, {
            key: 'treeColumnEditable',
            get: function get() {
                return this._treeColumnEditable;
            }
        }, {
            key: 'cacheTimestamp',
            get: function get() {
                return this._filterCacheTimestamp;
            },
            set: function set(timestamp) {
                this._filterCacheTimestamp = timestamp;
            }
        }]);

        return DhtmlxTableData;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/dhtmlx-table-data.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/footer-definition',['exports', 'html-css-sanitizer'], function (exports, _htmlCssSanitizer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FooterDefinition = undefined;

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

    var FooterDefinition = exports.FooterDefinition = function () {
        function FooterDefinition(footerFunction, text, alignment) {
            _classCallCheck(this, FooterDefinition);

            this.TOTAL = 'total';
            this.AVERAGE = 'average';
            this.MINIMUM = 'minimum';
            this.MAXIMUM = 'maximum';
            this.COUNT = 'count';
            this.CSPAN = 'column-span';
            this.RSPAN = 'row-span';
            this.TOTAL_FUNCTION = '{#stat_total}';
            this.AVG_FUNCTION = '{#stat_average}';
            this.MIN_FUNCTION = '{#stat_min}';
            this.MAX_FUNCTION = '{#stat_max}';
            this.COUNT_FUNCTION = '{#stat_count}';
            this.CSPAN_FUNCTION = '#cspan';
            this.RSPAN_FUNCTION = '#rspan';

            this._footerFunction = footerFunction;
            this._footerText = text;
            this._footerAlignment = alignment;
        }

        _createClass(FooterDefinition, [{
            key: 'footerFunction',
            get: function get() {
                return this._footerFunction;
            }
        }, {
            key: 'footerText',
            get: function get() {
                return this._footerText;
            }
        }, {
            key: 'footerAlignment',
            get: function get() {
                return this._footerAlignment;
            }
        }, {
            key: 'footer',
            get: function get() {
                var func = '';
                switch (this._footerFunction) {
                    case this.TOTAL:
                        func = this.TOTAL_FUNCTION;
                        break;
                    case this.AVERAGE:
                        func = this.AVG_FUNCTION;
                        break;
                    case this.MINIMUM:
                        func = this.MIN_FUNCTION;
                        break;
                    case this.MAXIMUM:
                        func = this.MAX_FUNCTION;
                        break;
                    case this.COUNT:
                        func = this.COUNT_FUNCTION;
                        break;
                    case this.CSPAN:
                        func = this.CSPAN_FUNCTION;
                        break;
                    case this.RSPAN:
                        func = this.RSPAN_FUNCTION;
                        break;
                }
                return this._footerText !== undefined && this._footerText.length > 0 ? _htmlCssSanitizer2.default.sanitize(this._footerText) + ' ' + func : func;
            }
        }]);

        return FooterDefinition;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/footer-definition.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/grid-advanced-configuration',['exports', './logger', './column-definition'], function (exports, _logger, _columnDefinition) {
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
            this.TABLE_FOOTER_STYLE = 'tableFooterStyle';
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
            this.ROW_ICON_STYLE = 'rowIconStyle';
            this.ROW_EXPANSION_ICON_STYLE = 'rowExpansionIconStyle';
            this.ROW_COLLAPSE_ICON_STYLE = 'rowCollapseIconStyle';

            this._defaultSelectedRows = [];
            this._preLoadTreeLevels = 1;
            this._maxRowCacheSize = 10000;
            this._enableColumnSorting = false;
            this._cellEditingEnabled = false;
            this._orderedStyleNames = [this.TABLE_WRAPPER_STYLE, this.TABLE_FOCUS_STYLE, this.TABLE_HEADER_STYLE, this.TABLE_SORTING_STYLE, this.ROW_BORDER_STYLE, this.PAGINATION_BUTTON_STYLE, this.CELL_BORDER_STYLE, this.ROW_BACKGROUND_STYLE, this.ROW_ALTERNATE_BACKGROUND_STYLE, this.ROW_SELECTED_STYLE, this.ROW_HOVER_STYLE, this.PAGINATION_SELECTED_STYLE, this.PAGINATION_HOVER_STYLE, this.TOOLTIP_STYLE, this.TOOLBAR_STYLE, this.TABLE_FOOTER_STYLE, this.SORT_ASCENDING_STYLE, this.SORT_DESCENDING_STYLE, this.ROW_ICON_STYLE, this.ROW_EXPANSION_ICON_STYLE, this.ROW_COLLAPSE_ICON_STYLE];
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
                        if (columnDefinitions[i].inLayout) {
                            _logger.Logger.error('Invalid column target "' + index + '" for field name "' + columnDefinitions[i].fieldName + '". Column target should be a positive integer.');
                        }
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
            key: 'isTreeGrid',
            set: function set(isTreeGrid) {
                this._isTreeGrid = isTreeGrid;
            },
            get: function get() {
                return this._isTreeGrid;
            }
        }, {
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
            key: 'enableFooter',
            set: function set(enableFooter) {
                this._enableFooter = enableFooter;
            },
            get: function get() {
                return this._enableFooter;
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
            key: 'idPathSeparator',
            set: function set(idPathSeparator) {
                this._idPathSeparator = idPathSeparator;
            },
            get: function get() {
                return this._idPathSeparator;
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
            key: 'enableContextMenu',
            set: function set(enableContextMenu) {
                this._enableContextMenu = enableContextMenu;
            },
            get: function get() {
                return this._enableContextMenu;
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
            key: 'expandRowOnDoubleClick',
            set: function set(expandRowOnDoubleClick) {
                this._expandRowOnDoubleClick = expandRowOnDoubleClick;
            },
            get: function get() {
                return this._expandRowOnDoubleClick;
            }
        }, {
            key: 'cellEditingEnabled',
            set: function set(enabled) {
                this._cellEditingEnabled = enabled;
            },
            get: function get() {
                return this._cellEditingEnabled;
            }
        }, {
            key: 'editButtons',
            set: function set(enabled) {
                this._editButtons = enabled;
            },
            get: function get() {
                return this._editButtons;
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
//# sourceMappingURL=../maps/grid-advanced/grid-advanced-configuration.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/grid-advanced-wrapper',['exports', './tw-grid-advanced', './configuration-parser-factory', './tooltip/tooltip-factory', 'lodash-amd'], function (exports, _twGridAdvanced, _configurationParserFactory, _tooltipFactory, _lodashAmd) {
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
//# sourceMappingURL=../maps/grid-advanced/grid-advanced-wrapper.js.map
;gaRequire.define('tw-grid-advanced', ['tw-grid-advanced/grid-advanced/grid-advanced-wrapper'], function (main) { return main; });

gaRequire.define('tw-grid-advanced/grid-advanced/grid-row',['exports', './components/renderers/html-renderer', 'lodash-amd'], function (exports, _htmlRenderer, _lodashAmd) {
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
            var createdAt = arguments[6];
            var dataIndex = arguments[7];

            _classCallCheck(this, GridRow);

            this._id = rowId;
            this._parent = parentId;
            this._rawData = rawValues;
            this._editedData = [rawValues.length];
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
            this._createdAt = createdAt;
            this._dataIndex = dataIndex;
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
            key: 'editedData',
            get: function get() {
                return this._editedData;
            }
        }, {
            key: 'isExpanded',
            get: function get() {
                return this._isExpanded;
            },
            set: function set(isExpanded) {
                this._isExpanded = isExpanded;
            }
        }, {
            key: 'createdAt',
            get: function get() {
                return this._createdAt;
            },
            set: function set(createdAt) {}
        }, {
            key: 'dataIndex',
            get: function get() {
                return this._dataIndex;
            }
        }]);

        return GridRow;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/grid-row.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/grid-style-handler',['exports', 'jquery', 'lodash-amd'], function (exports, _jquery, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.GridStyleHandler = undefined;

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

    var GridStyleHandler = exports.GridStyleHandler = function () {
        function GridStyleHandler(gridAdvanced, configuration, gridId, initialWordWrap) {
            _classCallCheck(this, GridStyleHandler);

            this._gridAdvanced = gridAdvanced;
            this._cfg = configuration;
            this._gridId = gridId;
            this._initialWordWrap = initialWordWrap;
        }

        GridStyleHandler.prototype.updateStyles = function updateStyles(cellClassNames) {
            (0, _jquery2.default)(this._gridAdvanced.entBox).siblings('style').remove();
            var styleBlock = this._generateStyleBlock(cellClassNames);
            var idSelector = '#' + this._gridId;
            var containerId = (0, _jquery2.default)(idSelector).parent('.widget-content').prop('id');
            (0, _jquery2.default)(idSelector).parent().prepend(styleBlock);
            (0, _jquery2.default)("#" + containerId).attr('tabindex', '-1');
        };

        GridStyleHandler.prototype._generateStyleBlock = function _generateStyleBlock(cellClassNames) {
            var _this = this;

            var styleRules = '';
            var idSelector = '#' + this._gridId;
            var containerId = (0, _jquery2.default)(idSelector).parent('.widget-content').prop('id');
            var footerWidth = (0, _jquery2.default)(this._gridAdvanced.entBox).width();
            var sideBorderWidth = 0;
            var sideBorderStyle = '';
            this._iconStyles = '';
            this.styleMap = new Map();

            _lodashAmd2.default.forEach(this._cfg.styleDefinitions, function (styleDef) {
                _this.styleMap.set(styleDef.displayName, styleDef);
            });
            _lodashAmd2.default.forEach(this._cfg.orderedStyleNames, function (styleName) {
                var styleDef = _this.styleMap.get(styleName);
                if (styleDef) {
                    var backgroundStyle = styleDef.getBackgroundStyle();
                    var borderStyle = styleDef.getBorderStyle();
                    var borderWidth = styleDef.getBorderWidth();
                    var fontStyle = styleDef.getFontStyle();
                    var iconStyle = '';
                    var cellBorderStyle = 'border-left-style: none; border-right-style: none;';
                    if (!styleDef.borderWidth || styleDef.borderWidth.length === 0 || !styleDef.borderStyle || styleDef.borderStyle.length === 0) {
                        cellBorderStyle = '';
                    }
                    switch (styleDef.displayName) {
                        case _this._cfg.TABLE_WRAPPER_STYLE:
                            styleRules += '#' + containerId + ' {' + borderStyle + '}';
                            styleRules += '#' + containerId + ' .objbox {' + backgroundStyle + '}';
                            break;
                        case _this._cfg.TABLE_HEADER_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td{' + backgroundStyle + borderStyle + fontStyle + ' padding-right:3px}';
                            styleRules += idSelector + ' .xhdr {' + backgroundStyle + '}';
                            break;
                        case _this._cfg.TABLE_FOCUS_STYLE:
                            styleRules += '#' + containerId + ':focus {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this._cfg.ROW_BORDER_STYLE:
                            var minRowHeightStyle = '';
                            if (_this._cfg.rowDefinition) {
                                minRowHeightStyle = 'height:' + _this._cfg.rowDefinition.minRowHeight + 'px;';
                            }
                            borderStyle = 'border-bottom-color: ' + styleDef.borderColor + '; border-bottom-width: ' + styleDef.borderWidth + '; border-bottom-style: ' + styleDef.borderStyle + ';';
                            styleRules += idSelector + ' .objbox table tbody .ev_material { ' + borderStyle + minRowHeightStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody .odd_material { ' + borderStyle + minRowHeightStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr:last-child { ' + borderStyle + '}';
                            break;
                        case _this._cfg.CELL_BORDER_STYLE:
                            if (styleDef.borderWidth && styleDef.borderWidth.length > 0) {
                                var _sideBorderWidth = parseInt(styleDef.borderWidth, 10);
                                var _sideBorderStyle = 'border-right-color: ' + styleDef.borderColor + '; border-right-width: ' + _sideBorderWidth + 'px; border-right-style: ' + styleDef.borderStyle + ';';
                                styleRules += idSelector + ' .objbox table tbody tr td {' + borderStyle + ' border-bottom-style: none; border-top-style: none; height:inherit; }';
                                styleRules += idSelector + ' .objbox table tbody tr { ' + _sideBorderStyle + ' }';
                            } else {
                                styleRules += idSelector + ' .objbox table tbody tr td { border: none }';
                            }
                            break;
                        case _this._cfg.ROW_BACKGROUND_STYLE:
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material td {' + backgroundStyle + fontStyle + '}';
                            break;
                        case _this._cfg.ROW_ALTERNATE_BACKGROUND_STYLE:
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material td {' + backgroundStyle + fontStyle + '}';
                            if (cellClassNames && cellClassNames.size > 0) {
                                cellClassNames.forEach(function (className, styles) {
                                    styleRules += idSelector + ' .objbox table tbody tr td.' + className + ' {' + styles + '}';
                                });
                            }
                            break;
                        case _this._cfg.ROW_HOVER_STYLE:
                            backgroundStyle = styleDef.getBackgroundStyle();
                            fontStyle = styleDef.getFontStyle();
                            if (!styleDef.borderWidth || styleDef.borderWidth.length === 0 || !styleDef.borderStyle || styleDef.borderStyle.length === 0) {
                                cellBorderStyle = '';
                            }
                            sideBorderWidth = parseInt(styleDef.borderWidth, 10);
                            styleDef.borderStyle = styleDef.borderStyle === 'solid' & sideBorderWidth === 1 ? 'double' : styleDef.borderStyle;
                            borderStyle = 'border-top-color: ' + styleDef.borderColor + '; border-top-width: ' + styleDef.borderWidth + '; border-top-style: ' + styleDef.borderStyle + '; border-bottom-color: ' + styleDef.borderColor + '; border-bottom-width: ' + styleDef.borderWidth + '; border-bottom-style: ' + styleDef.borderStyle + '; ' + cellBorderStyle;
                            sideBorderStyle = 'border-left-color: ' + styleDef.borderColor + '; border-left-width: ' + sideBorderWidth * 2 + 'px; border-left-style: ' + styleDef.borderStyle + ';' + 'border-right-color: ' + styleDef.borderColor + '; border-right-width: ' + sideBorderWidth * 2 + 'px; ' + 'border-right-style: ' + styleDef.borderStyle + ';' + 'border-top-color: ' + styleDef.borderColor + '; ' + 'border-top-width: ' + sideBorderWidth + 'px; ' + 'border-top-style: ' + styleDef.borderStyle + ';' + 'border-bottom-color: ' + styleDef.borderColor + '; border-bottom-width: ' + sideBorderWidth + 'px; ' + 'border-bottom-style: ' + styleDef.borderStyle + ';';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material td.grid_hover {' + borderStyle + backgroundStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material td.grid_hover {' + borderStyle + backgroundStyle + fontStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material:hover { ' + sideBorderStyle + ' }';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material:hover { ' + sideBorderStyle + ' }';
                            break;
                        case _this._cfg.ROW_SELECTED_STYLE:
                            backgroundStyle = styleDef.getBackgroundStyle();
                            fontStyle = styleDef.getFontStyle();
                            borderWidth = styleDef.borderColor !== undefined && styleDef.borderColor.length > 0 ? borderWidth : 0;

                            if (borderWidth > 0) {
                                borderStyle = 'border-top-color: ' + styleDef.borderColor + '; border-top-width: ' + borderWidth + 'px; border-top-style: ' + styleDef.borderStyle + '; border-bottom-color: ' + styleDef.borderColor + '; border-bottom-width: ' + borderWidth + 'px; border-bottom-style: ' + styleDef.borderStyle + '; ' + cellBorderStyle;
                            } else {
                                borderStyle = '; border-top-width: ' + borderWidth + 'px; border-top-style: ' + styleDef.borderStyle + '; border-bottom-width: ' + borderWidth + 'px; border-bottom-style: ' + styleDef.borderStyle + '; ' + cellBorderStyle;
                            }
                            sideBorderWidth = parseInt(borderWidth, 10);
                            var paddingLeft = 10 - sideBorderWidth;
                            sideBorderStyle = 'border-left-color: ' + styleDef.borderColor + '; border-left-width: ' + sideBorderWidth * 2 + 'px; border-left-style: ' + styleDef.borderStyle + ';' + 'border-right-color: ' + styleDef.borderColor + '; border-right-width: ' + sideBorderWidth * 2 + 'px; ' + 'border-right-style: ' + styleDef.borderStyle + ';';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material.rowselected td {' + backgroundStyle + fontStyle + borderStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material.rowselected td {' + backgroundStyle + fontStyle + borderStyle + '}';
                            styleRules += idSelector + ' .objbox table tbody tr.ev_material.rowselected { ' + sideBorderStyle + ' }';
                            styleRules += idSelector + ' .objbox table tbody tr.odd_material.rowselected { ' + sideBorderStyle + ' }';
                            styleRules += idSelector + ' .objbox table tbody tr.rowselected td:first-child {padding-left: ' + paddingLeft + 'px;}';
                            break;
                        case _this._cfg.PAGINATION_BUTTON_STYLE:
                            styleRules += idSelector + '-paging-container .dhx_toolbar_btn {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this._cfg.PAGINATION_SELECTED_STYLE:
                            styleRules += idSelector + '-paging-container .dhx_toolbar_btn[pageinfo="selected"]{' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this._cfg.PAGINATION_HOVER_STYLE:
                            styleRules += idSelector + '-paging-container .dhxtoolbar_btn_over {' + backgroundStyle + borderStyle + fontStyle + '}';
                            break;
                        case _this._cfg.TOOLTIP_STYLE:
                            styleRules += '#tiptip_holder.' + _this._gridId + ' #tiptip_content {' + backgroundStyle + borderStyle + fontStyle + '}';
                            var tiptipArrowStyle = '';
                            borderStyle.split(';').forEach(function (element) {
                                if (element.indexOf('border-color') === 0) {
                                    tiptipArrowStyle = element.replace('border-color', 'border-bottom-color');
                                }
                            });
                            styleRules += 'body #tiptip_holder.tip_bottom.' + _this._gridId + ' #tiptip_arrow_inner {' + tiptipArrowStyle + '}';
                            break;
                        case _this._cfg.TOOLBAR_STYLE:
                            var resetLocation = '';
                            var searchLocation = '';
                            var editButtonsLocation = '';
                            var paginationLocation = '';

                            if (_this._cfg.resetButton && _this._cfg.resetButton.enabled) {
                                resetLocation = _this._cfg.resetButton.location;
                            }
                            if (_this._cfg.searchSettings && _this._cfg.searchSettings.enabled) {
                                searchLocation = _this._cfg.searchSettings.location;
                            }
                            if (_this._cfg.editButtons && _this._cfg.editButtons.enabled) {
                                editButtonsLocation = _this._cfg.editButtons.location;
                            }

                            if(_this._cfg.paginationSettings && _this._cfg.paginationSettings._enabled) {
                                paginationLocation = _this._cfg.paginationSettings.pageLocation.split("-")[0];
                            }
                            if (paginationLocation.indexOf('top') >= 0 || resetLocation.indexOf('top') >= 0 || searchLocation.indexOf('top') >= 0 || editButtonsLocation.indexOf('top') >= 0) {
                                styleRules += idSelector + '-top-container {' + backgroundStyle + borderStyle + fontStyle + '}';
                            } else {
                                styleRules += idSelector + '-top-container { display: none; }';
                            }

                            if (paginationLocation.indexOf('bottom') >= 0 || resetLocation.indexOf('bottom') >= 0 || searchLocation.indexOf('bottom') >= 0 || editButtonsLocation.indexOf('bottom') >= 0 ) {
                                styleRules += idSelector + '-bottom-container {' + backgroundStyle + borderStyle + fontStyle + '}';
                            } else {
                                styleRules += idSelector + '-bottom-container { display: none; }';
                            }
                            break;
                        case _this._cfg.TABLE_FOOTER_STYLE:
                            styleRules += idSelector + ' div.ftr td {' + backgroundStyle + fontStyle + '}';
                            styleRules += idSelector + ' div.ftr {' + backgroundStyle + borderStyle + '}';
                            if (footerWidth > 0 && borderWidth > 0) {
                                footerWidth -= 2 * borderWidth;
                                styleRules += idSelector + ' div.ftr { width: ' + footerWidth + 'px;}';
                            }
                            break;
                        case _this._cfg.SORT_ASCENDING_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td.dhxgrid_sort_asc_col {' + ' background-image: url(' + styleDef.image + ');' + ' background-position: 2px 6px;' + ' background-repeat: no-repeat;' + ' background-size: 10px 10px;' + '}';
                            break;
                        case _this._cfg.SORT_DESCENDING_STYLE:
                            styleRules += idSelector + ' .xhdr table tbody tr td.dhxgrid_sort_desc_col {' + ' background-image: url(' + styleDef.image + ');' + ' background-position: 2px 15px;' + ' background-repeat: no-repeat;' + ' background-size: 10px 10px;' + '}';
                            break;
                        case _this._cfg.ROW_ICON_STYLE:
                            iconStyle = styleDef.image && styleDef.image !== '' ? ' background-image: url(' + styleDef.image + '); ' : ' display: none;';
                            styleRules += idSelector + ' .objbox table tbody tr td .treegrid_cell img:nth-last-child(2) {' + iconStyle + ' }';
                            _this._iconStyles += idSelector + ' .objbox table tbody tr td .treegrid_cell img:nth-last-child(2) {' + iconStyle + ' }';
                            break;
                        case _this._cfg.ROW_EXPANSION_ICON_STYLE:
                            iconStyle = styleDef.image && styleDef.image !== '' ? ' background-image: url(' + styleDef.image + '); ' : ' display: none;';
                            styleRules += idSelector + ' .objbox table tbody tr td .treegrid_cell img.grid_collapse_icon[src*="minus.gif"] {' + iconStyle + ' }';
                            _this._iconStyles += idSelector + ' .objbox table tbody tr td .treegrid_cell img.grid_collapse_icon[src*="minus.gif"] {' + iconStyle + ' }';
                            break;
                        case _this._cfg.ROW_COLLAPSE_ICON_STYLE:
                            iconStyle = styleDef.image && styleDef.image !== '' ? ' background-image: url(' + styleDef.image + '); ' : ' display: none;';
                            styleRules += idSelector + ' .objbox table tbody tr td .treegrid_cell img.grid_collapse_icon[src*="plus.gif"] {' + iconStyle + ' }';
                            _this._iconStyles += idSelector + ' .objbox table tbody tr td .treegrid_cell img.grid_collapse_icon[src*="plus.gif"] {' + iconStyle + ' }';
                            break;
                    }
                }
            });
            styleRules += idSelector + '-paging-container .dhx_toolbar_text { width: auto; }';
            styleRules += idSelector + ' table.obj tr td { padding-top: 0px; padding-bottom: 0px; }';
            styleRules += idSelector + ' .objbox table tbody tr td { ' + this._initialWordWrap + '}';
            var styleBlock = '<style>' + styleRules + '</style>';
            return styleBlock;
        };

        GridStyleHandler.cascadeCellStyles = function cascadeCellStyles(rowStyle, colStyle, defaultRowStyle) {
            var _this2 = this;

            var style = '';

            if (colStyle && colStyle !== '') {
                var colStyleMap = this.createStyleMap(colStyle);
                var gridRowStyle = '';
                if (rowStyle && rowStyle !== '') {
                    gridRowStyle = rowStyle;
                } else if (defaultRowStyle && defaultRowStyle.backgroundColor) {
                    gridRowStyle = 'background: ' + defaultRowStyle.backgroundColor + ';';
                }
                if (gridRowStyle && gridRowStyle !== '') {
                    var rowStyleMap = this.createStyleMap(gridRowStyle);
                    colStyleMap.forEach(function (value, key) {
                        if (value) {
                            if (key === 'background') {
                                var colBackground = colStyleMap.get(key);
                                var rowBackground = rowStyleMap.get(key);

                                if (colBackground && rowBackground && colBackground[0].indexOf('rgba') >= 0) {
                                    var cellBackground = _this2.blendColors(rowBackground[0], colBackground[0]);
                                    style += 'background: ' + cellBackground + ';';
                                } else {
                                    value.forEach(function (v) {
                                        style += key + ':' + v + ';';
                                    });
                                }
                            } else {
                                value.forEach(function (v) {
                                    style += key + ':' + v + ';';
                                });
                            }
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
                } else {
                    style = colStyle;
                }
            } else if (rowStyle && rowStyle !== '') {
                style = rowStyle;
            }
            return style;
        };

        GridStyleHandler.blendColors = function blendColors(color1, color2) {
            var rgba1 = this.parseRGBAValues(color1);
            var rgba2 = this.parseRGBAValues(color2);
            if (rgba1 && rgba2) {
                var newAlpha = 1 - (1 - rgba2.alpha) * (1 - rgba1.alpha);
                var newRed = Math.round(rgba2.red * rgba2.alpha / newAlpha + rgba1.red * rgba1.alpha * (1 - rgba2.alpha) / newAlpha);
                var newGreen = Math.round(rgba2.green * rgba2.alpha / newAlpha + rgba1.green * rgba1.alpha * (1 - rgba2.alpha) / newAlpha);
                var newBlue = Math.round(rgba2.blue * rgba2.alpha / newAlpha + rgba1.blue * rgba1.alpha * (1 - rgba2.alpha) / newAlpha);
                return 'rgba(' + newRed + ',' + newGreen + ',' + newBlue + ',' + newAlpha + ')';
            } else if (!rgba2) {
                return color1;
            } else {
                return color2;
            }
        };

        GridStyleHandler.parseRGBAValues = function parseRGBAValues(value) {
            var rgbaObj = void 0;
            if (value.indexOf('#') >= 0) {
                value = value.replace('#', '');
                rgbaObj = {};
                rgbaObj.red = parseInt(value.substring(0, 2), 16);
                rgbaObj.green = parseInt(value.substring(2, 4), 16);
                rgbaObj.blue = parseInt(value.substring(4, 6), 16);
                rgbaObj.alpha = 1;
            } else if (value.indexOf('rgba') >= 0) {
                value = value.substring(5, value.length - 1);
                var rgbaVal = value.split(',');
                rgbaObj = {};
                rgbaObj.red = parseInt(rgbaVal[0], 10);
                rgbaObj.green = parseInt(rgbaVal[1], 10);
                rgbaObj.blue = parseInt(rgbaVal[2], 10);
                rgbaObj.alpha = parseFloat(rgbaVal[3]);
            } else {
                Logger.warn('Unable to parse rgba: Color format not supported.');
            }
            return rgbaObj;
        };

        GridStyleHandler.createStyleMap = function createStyleMap(styleString) {
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

        return GridStyleHandler;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/grid-style-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/header-definition',['exports'], function (exports) {
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
//# sourceMappingURL=../maps/grid-advanced/header-definition.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/json-configuration-parser',['exports', 'lodash-amd', './column-definition', './header-definition', './column-formatter-factory', './components/definitions/state-definition', './row-formatter', './row-definition', './pagination-settings', './search-settings', './configuration-parser', './cell-editor', './cell-validator', './logger', './footer-definition'], function (exports, _lodashAmd, _columnDefinition, _headerDefinition, _columnFormatterFactory, _stateDefinition, _rowFormatter, _rowDefinition, _paginationSettings, _searchSettings, _configurationParser, _cellEditor, _cellValidator, _logger, _footerDefinition) {
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

            _this._gridAdvancedConfiguration.isTreeGrid = isTreeGrid;
            _this._gridAdvancedConfiguration.styleDefinitions = _this.createStyleDefinitions(configuration.styles);
            _this._gridAdvancedConfiguration.headerDefinition = _this._createHeaderDefinition(configuration);

            _this._gridAdvancedConfiguration.cellEditingEnabled = _this._cellEditingEnabled(configuration);
            _this._gridAdvancedConfiguration.columnDefinitions = _this._createColumnDefinitions(configuration);
            _this._gridAdvancedConfiguration.paginationSettings = _this._createPaginationSettings(configuration);
            _this._gridAdvancedConfiguration.rowFormatter = _this._createRowFormatter(configuration);
            _this._gridAdvancedConfiguration.rowDefinition = _this._createRowDefinition(configuration);
            _this._gridAdvancedConfiguration.splitColumnIndex = -1;
            _this._gridAdvancedConfiguration.searchSettings = _this._createSearchSettings(configuration);
            _this._gridAdvancedConfiguration.resetButton = configuration.resetButton;
            _this._gridAdvancedConfiguration.editButtons = configuration.editButtons;
            _this._createMultiColumnSortOrder(configuration);
            _this._gridAdvancedConfiguration.maxRowCacheSize = _this._createMaxRowCacheSize(configuration);
            _this._gridAdvancedConfiguration.parentIdFieldName = _this._createParentIdFieldName(configuration);
            _this._gridAdvancedConfiguration.idFieldName = _this._createIdFieldName(configuration);
            _this._gridAdvancedConfiguration.hasChildrenFieldName = _this._createHasChildrenFieldName(configuration);
            _this._gridAdvancedConfiguration.expandAllLoadedLevels = _this._createExpandAllLoadedLevels(configuration);
            _this._gridAdvancedConfiguration.includeRowExpansionParents = _this._createIncludeRowExpansionParents(configuration);
            _this._gridAdvancedConfiguration.preserveRowExpansion = _this._createPreserveRowExpansion(configuration);
            _this._gridAdvancedConfiguration.expandRowOnDoubleClick = _this._expandRowOnDoubleClick(configuration);
            _this._gridAdvancedConfiguration.cellEditingEnabled = _this._cellEditingEnabled(configuration);
            _this._gridAdvancedConfiguration.enableContextMenu = _this._enableContextMenu(configuration);
            _this._gridAdvancedConfiguration.idPathSeparator = _this._createIdPathSeparator(configuration);
            _this._gridAdvancedConfiguration.clientSideSorting = configuration.clientSideSorting;
            _this._gridAdvancedConfiguration.enableBlockSelection = configuration.enableBlockSelection;
			_this._gridAdvancedConfiguration.enableTextFiltering = configuration.enableFiltering;

			_this._gridAdvancedConfiguration.textFilteringType = configuration.filteringType || "text_filter";
            _this._gridAdvancedConfiguration.enableFooter = _this._enableFooter(configuration);
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
            var rowDefinition = new _rowDefinition.RowDefinition();
            if (config && config.rows) {
                rowDefinition.stateFormatter = config.rows.stateFormatter;
                rowDefinition.childRowDetails = config.rows.childRowDetails;
                rowDefinition.selection = config.rows.selection;
                rowDefinition.defaultSelectedRows = config.rows.defaultSelectedRows;
                rowDefinition.defaultSelectedRowExpanded = config.rows.defaultSelectedRowExpanded;
                rowDefinition.batchEditMode = config.rows.batchEditMode;
                rowDefinition.childRowsEnabled = config.rows.childRowsEnabled;
                rowDefinition.defaultSelectedRows = this._createDefaultSelectedRows(config);
                rowDefinition.minRowHeight = config.rows.minHeight;
                rowDefinition.autoScroll = config.rows.autoScroll;
            }
            return rowDefinition;
        };

        JsonConfigurationParser.prototype._createColumnDefinition = function _createColumnDefinition(columnDef) {
            var columnDefinition = void 0;
            if (columnDef) {
                columnDefinition = new _columnDefinition.ColumnDefinition(columnDef.targets, columnDef.fieldName, columnDef.title, this._createColumnFormatter(columnDef.columnFormatter, columnDef.textAlignment.toLowerCase()));
                columnDefinition.width = columnDef.width;
                columnDefinition.autoWidth = columnDef.autoWidth;
                columnDefinition.overflow = columnDef.overflow;
                columnDefinition.textAlignment = columnDef.textAlignment.toLowerCase();
                columnDefinition.headerTextAlignment = columnDef.headerTextAlignment.toLowerCase();
                columnDefinition.hidden = columnDef.hidden;
                columnDefinition.inLayout = columnDef.inLayout;
                columnDefinition.sortOrder = columnDef.sortOrder;
                columnDefinition.headerFilter = columnDef.headerFilter;
                columnDefinition.description = columnDef.description;
                columnDefinition.footerDefinition = this._createFooterDefinition(columnDef);
            }
            return columnDefinition;
        };

        JsonConfigurationParser.prototype._createColumnFormatter = function _createColumnFormatter(formatterDef, textAlignment) {
            var columnFormatter = void 0;
            var cellEditor = this._createCellEditor(formatterDef);
            if (formatterDef) {
                var params = formatterDef.params ? formatterDef.params : {};
                if (textAlignment) {
                    params['textAlignment'] = textAlignment;
                }
                columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter(formatterDef.type, formatterDef.format, params, cellEditor);
                if (columnFormatter) {
                    columnFormatter.stateDefinition = this._createStateDefinition(formatterDef.stateDefinition);
                }
            } else {
                columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter('default', '', null, cellEditor);
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

        JsonConfigurationParser.prototype._createFooterDefinition = function _createFooterDefinition(columnDef) {
            var footerDefinition = void 0;
            if (columnDef && columnDef.footer) {
                footerDefinition = new _footerDefinition.FooterDefinition(columnDef.footer.function, columnDef.footer.text);
            }
            return footerDefinition;
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

        JsonConfigurationParser.prototype._cellEditingEnabled = function _cellEditingEnabled(config) {
            var cellEditingEnabled = false;
            if (config && config.cellEditingEnabled) {
                cellEditingEnabled = config.cellEditingEnabled;
            }
            return cellEditingEnabled;
        };

        JsonConfigurationParser.prototype._enableContextMenu = function _enableContextMenu(config) {
            var enableContextMenu = true;
            if (config && config.enableContextMenu === false) {
                enableContextMenu = config.enableContextMenu;
            }
            return enableContextMenu;
        };

        JsonConfigurationParser.prototype._createIdPathSeparator = function _createIdPathSeparator(config) {
            var idPathSeparator = ':;';
            if (config && config.treeSettings && config.treeSettings.idPathSeparator !== undefined) {
                idPathSeparator = config.treeSettings.idPathSeparator;
            }
            return idPathSeparator;
        };

        JsonConfigurationParser.prototype._enableFooter = function _enableFooter(config) {
            var enableFooter = false;
            if (config && config.enableFooter === true) {
                enableFooter = config.enableFooter;
            }
            return enableFooter;
        };

        JsonConfigurationParser.prototype._createCellEditor = function _createCellEditor(formatterDef) {
            var type = formatterDef !== undefined ? formatterDef.type : undefined;
            var cellEditor = new _cellEditor.CellEditor(type, false, undefined);
            if (formatterDef && formatterDef.cellEditor) {
                var validator = void 0;
                var config = formatterDef.cellEditor;
                if (config.validator) {
                    var vCfg = config.validator;
                    var liveValidation = vCfg.liveValidation ? vCfg.liveValidation : false;
                    var types = [];
                    if (vCfg) {
                        types = vCfg.types;
                    } else {
                        _logger.Logger.warn('No cell editor validation types defined');
                    }
                    var successMsg = vCfg.successMessage ? vCfg.successMessage : '';
                    var errorMsg = vCfg.errorMessage ? vCfg.errorMessage : '';
                    var successStyle = vCfg.successStyle ? vCfg.successStyle : '';
                    var errorStyle = vCfg.errorStyle ? vCfg.errorStyle : '';

                    if (vCfg.successMessage === undefined) {
                        _logger.Logger.warn('No cell edit success message defined');
                    }
                    if (vCfg.errorMessage === undefined) {
                        _logger.Logger.warn('No cell edit error message defined');
                    }
                    if (vCfg.successStyle === undefined) {
                        _logger.Logger.warn('No cell edit success style defined');
                    }
                    if (vCfg.errorStyle === undefined) {
                        _logger.Logger.warn('No cell edit error style defined');
                    }
                    validator = new _cellValidator.CellValidator(liveValidation, types, successMsg, errorMsg, successStyle, errorStyle);
                }
                cellEditor = new _cellEditor.CellEditor(type, config.enabled, validator);
            }
            return cellEditor;
        };

        JsonConfigurationParser.prototype._expandRowOnDoubleClick = function _expandRowOnDoubleClick(config) {
            var expandRowOnDoubleClick = false;
            if (config && config.treeSettings && config.treeSettings.expandRowOnDoubleClick) {
                expandRowOnDoubleClick = config.treeSettings.expandRowOnDoubleClick;
            }
            return expandRowOnDoubleClick;
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
//# sourceMappingURL=../maps/grid-advanced/json-configuration-parser.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/logger',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var LOG_LEVEL = 'error';

    var Logger = exports.Logger = function () {
        function Logger(defaultLogLevel) {
            _classCallCheck(this, Logger);

            this._defaultLogLevel = defaultLogLevel;
        }

        Logger.debug = function debug(message) {
            if (console && LOG_LEVEL === 'debug') {
                console.debug(message);
            }
        };

        Logger.warn = function warn(message) {
            if (console && LOG_LEVEL === 'warn') {
                console.warn(message);
            }
        };

        Logger.info = function info(message) {
            if (console && LOG_LEVEL === 'info') {
                console.info(message);
            }
        };

        Logger.error = function error(message) {
            if (console && LOG_LEVEL === 'error') {
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
//# sourceMappingURL=../maps/grid-advanced/logger.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/mashup-builder-configuration-parser',['exports', './column-definition', './header-definition', './column-formatter-factory', './components/definitions/style-definition', './components/definitions/state-definition', './row-formatter', './row-definition', './pagination-settings', './configuration-parser', './logger', './search-settings', './cell-editor', './cell-validator'], function (exports, _columnDefinition, _headerDefinition, _columnFormatterFactory, _styleDefinition, _stateDefinition, _rowFormatter, _rowDefinition, _paginationSettings, _configurationParser, _logger, _searchSettings, _cellEditor, _cellValidator) {
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

            _this._gridAdvancedConfiguration.isTreeGrid = isTreeGrid;
            _this._styleResolver = styleResolver;
            _this._localizationResolver = localizationResolver;
            _this._gridAdvancedConfiguration.headerDefinition = _this._convertHeaderDefinition(configuration.getProperty('HeaderOverflow'), configuration.getProperty('MaxHeaderHeight'));

            _this._gridAdvancedConfiguration.cellEditingEnabled = configuration.getProperty('IsEditable');
            _this._gridAdvancedConfiguration.columnDefinitions = _this._convertColumnDefinitions(configuration.getProperty('ColumnFormat'), configuration.getProperty('DataOverflow'));
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
            _this._gridAdvancedConfiguration.expandRowOnDoubleClick = configuration.getProperty('ExpandRowOnDoubleClick');
            _this._gridAdvancedConfiguration.enableContextMenu = configuration.getProperty('EnableContextMenu');
            _this._gridAdvancedConfiguration.editButtons = _this._convertEditButtonsConfig(configuration);
            _this._gridAdvancedConfiguration.idPathSeparator = configuration.getProperty('IDPathSeparator');
            _this._gridAdvancedConfiguration.enableFooter = configuration.getProperty('EnableFooter');
            _this._gridAdvancedConfiguration.clientSideSorting = configuration.getProperty('ClientSideSorting');
            _this._gridAdvancedConfiguration.enableBlockSelection = configuration.getProperty('EnableBlockSelection');
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

        MashupBuilderConfigurationParser.prototype._convertEditButtonsConfig = function _convertEditButtonsConfig(configuration) {
            var editButtonsConfig = {};
            editButtonsConfig.enabled = configuration.getProperty('EnableEditButtons');
            editButtonsConfig.location = configuration.getProperty('EditButtonsLocation');
            return editButtonsConfig;
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
            styles.tableFooterStyle = this._styleResolver(configuration.getProperty('TableFooterStyle', 'DefaultGridAdvancedFooterStyle'));
            styles.sortAscendingStyle = this._styleResolver(configuration.getProperty('SortAscendingStyle', 'DefaultSortAscendingStyle'));
            styles.sortDescendingStyle = this._styleResolver(configuration.getProperty('SortDescendingStyle', 'DefaultSortDescendingStyle'));
            styles.rowIconStyle = this._styleResolver(configuration.getProperty('RowIconStyle', 'DefaultRowIconStyle'));
            styles.rowExpansionIconStyle = this._styleResolver(configuration.getProperty('RowExpansionIconStyle', 'DefaultRowExpansionIconStyle'));
            styles.rowCollapseIconStyle = this._styleResolver(configuration.getProperty('RowCollapseIconStyle', 'DefaultRowCollapseIconStyle'));
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

        MashupBuilderConfigurationParser.prototype._convertColumnDefinitions = function _convertColumnDefinitions(inputColumnDefs, overflow) {
            var _this3 = this;

            var columnDefinitions = void 0;

            if (inputColumnDefs && inputColumnDefs.formatInfo) {
                columnDefinitions = [];
                var columnIndex = -1;
                inputColumnDefs.formatInfo.forEach(function (inputColumnDef, index) {
                    var cellEditor = void 0;
                    var formatterType = inputColumnDef.FormatOptions.renderer.toLowerCase();
                    var validatorType = inputColumnDef.Validator;
                    var editorConfig = {
                        enabled: inputColumnDef.AllowEdit,
                        validator: {
                            type: validatorType,
                            liveValidation: false,
                            successMessage: '',
                            errorMessage: inputColumnDef.ValidationMessage,
                            successStyle: 'DefaultGridAdvancedValidationSuccessStyle',
                            errorStyle: 'DefaultGridAdvancedValidationErrorStyle'
                        }
                    };
                    cellEditor = _this3._createCellEditor(formatterType, editorConfig);
                    var roundingEnabled = inputColumnDef.FormatOptions.roundingEnabled !== undefined ? inputColumnDef.FormatOptions.roundingEnabled : true;
                    var params = {
                        textFormat: inputColumnDef.FormatOptions.formatText,
                        roundingEnabled: roundingEnabled,
                        textAlignment: inputColumnDef.Align.toLowerCase()
                    };

                    var columnFormatter = _columnFormatterFactory.ColumnFormatterFactory.getFormatter(inputColumnDef.FormatOptions.renderer, _this3._localizationResolver(inputColumnDef.FormatOptions.FormatString), params, cellEditor);

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
                    var inLayout = inputColumnDef.inLayout !== undefined ? inputColumnDef.inLayout : true;
                    var cIndex = inLayout ? columnIndex += 1 : -1;
                    var columnDefinition = new _columnDefinition.ColumnDefinition(cIndex, inputColumnDef.FieldName, inputColumnDef.Title, columnFormatter);
                    columnDefinition.hidden = inputColumnDef.hidden !== undefined ? inputColumnDef.hidden : false;
                    columnDefinition.inLayout = inLayout;
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
                    columnDefinition.headerFilter = inputColumnDef.HeaderFilter;
                    columnDefinition.headerTextAlignment = inputColumnDef.headerTextAlignment;
                    columnDefinitions.push(columnDefinition);
                });
            }
            return columnDefinitions;
        };

        MashupBuilderConfigurationParser.prototype._createCellEditor = function _createCellEditor(formatterType, config) {
            var cellEditor = new _cellEditor.CellEditor(formatterType, false, undefined);
            if (config) {
                var validator = void 0;
                if (config.validator) {
                    var vCfg = config.validator;
                    var liveValidation = vCfg.liveValidation ? vCfg.liveValidation : false;
                    var types = [];
                    if (vCfg) {
                        types = vCfg.types;
                    } else {
                        _logger.Logger.warn('No cell editor validation types defined');
                    }
                    var successMsg = vCfg.successMessage ? vCfg.successMessage : '';
                    var errorMsg = vCfg.errorMessage ? vCfg.errorMessage : '';
                    var successStyle = vCfg.successStyle ? vCfg.successStyle : '';
                    var errorStyle = vCfg.errorStyle ? vCfg.errorStyle : '';

                    if (vCfg.successMessage === undefined) {
                        _logger.Logger.warn('No cell edit success message defined');
                    }
                    if (vCfg.errorMessage === undefined) {
                        _logger.Logger.warn('No cell edit error message defined');
                    }
                    if (vCfg.successStyle === undefined) {
                        _logger.Logger.warn('No cell edit success style defined');
                    }
                    if (vCfg.errorStyle === undefined) {
                        _logger.Logger.warn('No cell edit error style defined');
                    }
                    validator = new _cellValidator.CellValidator(liveValidation, types, successMsg, errorMsg, successStyle, errorStyle);
                }
                cellEditor = new _cellEditor.CellEditor(formatterType, config.enabled, validator);
            }
            return cellEditor;
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
//# sourceMappingURL=../maps/grid-advanced/mashup-builder-configuration-parser.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/pagination-settings',['exports'], function (exports) {
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
      this._pageLocation = pageLocation !== undefined ? pageLocation : 'bottom-right';
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
//# sourceMappingURL=../maps/grid-advanced/pagination-settings.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/performance-monitor',['exports', './logger'], function (exports, _logger) {
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
//# sourceMappingURL=../maps/grid-advanced/performance-monitor.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/query-handler',['exports'], function (exports) {
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
//# sourceMappingURL=../maps/grid-advanced/query-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/row-definition',['exports'], function (exports) {
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
        function RowDefinition() {
            _classCallCheck(this, RowDefinition);

            this._selection = 'single';
            this._defaultSelectedRows = [];
            this._defaultSelectedRowExpanded = false;
            this._batchEditMode = 'selected';
            this._childRowsEnabled = false;
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
//# sourceMappingURL=../maps/grid-advanced/row-definition.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/row-formatter',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
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
//# sourceMappingURL=../maps/grid-advanced/row-formatter.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/search-settings',['exports'], function (exports) {
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
//# sourceMappingURL=../maps/grid-advanced/search-settings.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/selection-handler',['exports', 'jquery', 'lodash-amd'], function (exports, _jquery, _lodashAmd) {
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

        SelectionHandler.prototype.refreshSelections = function refreshSelections(executeCallback) {
            this.setSelectionsById(_lodashAmd2.default.keys(this._selections), executeCallback);
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

        SelectionHandler.prototype.setSelectionsById = function setSelectionsById(selections, executeCallback) {
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
                    var leafId = id;
                    if (_this._cfg.includeRowExpansionParents) {
                        leafId = _this._dhtmlxTableData.getLeafId(id);
                    }
                    _this._gridAdvanced.selectRowById(leafId, _this._selectionType === 'multi', false);

                    if (_this._isTreeGrid && _this._expandRowCallback) {
                        _this._expandRowCallback(id, true);
                    }
                });
                this._triggerSelectionEvent = true;
                this._onSelectRows(selections.join(','), executeCallback);
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

        SelectionHandler.prototype.setSelections = function setSelections(selectionIndices, fromWidgetUpdate) {
            var _this3 = this;

            if (selectionIndices) {
                selectionIndices = selectionIndices.map(function (index) {
                    return _this3._gridAdvanced.getRowId(index);
                });
                this.setSelectionsById(selectionIndices, !fromWidgetUpdate);
            }
        };

        SelectionHandler.prototype.removeBindings = function removeBindings() {
            (0, _jquery2.default)(this._gridAdvanced).off('click', 'tr');
        };

        SelectionHandler.prototype._onSelectRows = function _onSelectRows(ids, executeCallback) {
            executeCallback = executeCallback === null ? true : executeCallback;
            if (!this._rowSelectionCallback || !this._triggerSelectionEvent) {
                return;
            }
            if (ids === undefined || ids === null || ids.length === 0) {
                this._selections = {};
                this._lastSelectedId = undefined;
                if (executeCallback) {
                    this._rowSelectionCallback(this._createSelectedRowIndexes(), []);
                }
                return;
            }
            var idsArray = ids.split(',');
            this._lastSelectedId = idsArray[idsArray.length - 1];
            this._selections = this._convertIdsToGridType(idsArray);
            if (executeCallback) {
                if (this._isTreeGrid) {
                    this._rowSelectionCallback(this._createSelectedRowIndexes(), this._createSelectedRows());
                } else {
                    this._rowSelectionCallback(this._createSelectedRowIndexes());
                }
            }
        };

        SelectionHandler.prototype._onSelectRow = function _onSelectRow(rowId) {
            if (this._rowSelectionCallback) {
                this._lastSelectedId = rowId;
                this._selections = this._convertIdsToGridType([rowId]);
                if (this._isTreeGrid) {
                    this._rowSelectionCallback(this._createSelectedRowIndexes(), this._createSelectedRows());
                } else {
                    this._rowSelectionCallback(this._createSelectedRowIndexes());
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
                    var idPath = id;
                    var rawData = rowData ? rowData.rawData : undefined;
                    if (_this4._cfg.includeRowExpansionParents) {
                        idPath = _this4._dhtmlxTableData.createIdPath(id);
                        var idIndex = _this4._dhtmlxTableData.findColumnIndex(_this4._cfg.idFieldName);
                        if (rowData) {
                            var clonedData = _lodashAmd2.default.clone(rowData);
                            clonedData.rawData[idIndex] = idPath;
                            if (clonedData.rawData) {
                                rawData = clonedData.rawData;
                            }
                        }
                    }
                    if (rawData) {
                        combinedData = _lodashAmd2.default.zipObject(_this4._dhtmlxTableData.allColumns, rawData);
                    }
                    return combinedData;
                }).filter(function (row) {
                    return row !== null;
                });
            }
            return selectionData;
        };

        SelectionHandler.prototype._createSelectedRowIndexes = function _createSelectedRowIndexes() {
            var _this5 = this;

            var selectedRowIndexes = [];
            if (this._dhtmlxTableData) {
                selectedRowIndexes = _lodashAmd2.default.keys(this._selections).map(function (id) {
                    var rowData = _this5._dhtmlxTableData.getRowById(id);
                    return rowData ? rowData.dataIndex : undefined;
                }).filter(function (row) {
                    return row !== null;
                });
            }
            return selectedRowIndexes;
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
            key: 'configuration',
            set: function set(cfg) {
                this._cfg = cfg;
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
//# sourceMappingURL=../maps/grid-advanced/selection-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/stack',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Stack = undefined;

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

    var Stack = exports.Stack = function () {
        function Stack(maxStackSize) {
            _classCallCheck(this, Stack);

            this._stackSize = maxStackSize;
            this._items = new Array();
        }

        Stack.prototype.pop = function pop() {
            return this._items.shift();
        };

        Stack.prototype.push = function push(item) {
            var removed = [];
            if (this._stackSize) {
                if (this._items.length + 1 < this._stackSize) {
                    this._items.unshift(item);
                } else {
                    removed = this._items.splice(this._items.length - 1, 1);
                }
            } else {
                this._items.unshift(item);
            }
            return removed;
        };

        Stack.prototype.remove = function remove(myItem, comparator) {
            var index = _lodashAmd2.default.findIndex(this._items, function (item) {
                return comparator(item, myItem);
            });
            this._items.splice(index, 1);
        };

        Stack.prototype.size = function size() {
            return this._items.length;
        };

        return Stack;
    }();
});
//# sourceMappingURL=../maps/grid-advanced/stack.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/tw-grid-advanced',['exports', 'lodash-amd', 'jquery', './logger', './selection-handler', './column-sort-handler', './configuration-parser', './tooltip/default-tooltip', './dhtmlx-table-data', './events/register-event', './performance-monitor', './user-setting-handler', './child-grid-handler', './query-handler', './grid-style-handler'], function (exports, _lodashAmd, _jquery, _logger, _selectionHandler, _columnSortHandler, _configurationParser, _defaultTooltip, _dhtmlxTableData, _registerEvent, _performanceMonitor, _userSettingHandler, _childGridHandler, _queryHandler, _gridStyleHandler) {
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

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var _dec, _dec2, _class;

    var MIN_COLUMN_AUTO_WIDTH = 50;

    var TwGridAdvanced = exports.TwGridAdvanced = (_dec = (0, _registerEvent.RegisterEvent)('onRowDblClicked'), _dec2 = (0, _registerEvent.RegisterEvent)('onRowExpanded'), _dec(_class = _dec2(_class = function () {
        function TwGridAdvanced(gridId, rowSelectionCallBack) {
            var isTreeGrid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            _classCallCheck(this, TwGridAdvanced);

            this._performanceMonitor = new _performanceMonitor.PerformanceMonitor(false);
            this._performanceMonitor.startTime('constructor');
            this._gridId = gridId;
            this._menu = undefined;
            this._gridAdvanced = new dhtmlXGridObject(gridId);
            this._defaultStyles = {};
            this._responsiveLayout = false;
            this._tooltip = _defaultTooltip.DefaultTooltip;
            this._columnConfigs = [];
            this._selectionHandler = new _selectionHandler.SelectionHandler(isTreeGrid, this._gridAdvanced, this._dhtmlxTableData, rowSelectionCallBack, this._expandOrRetrieveRows.bind(this));
            this._imagePath = '../Common/thingworx/widgets/gridadvanced/imgs/';
            this._menuIconsPath = '../Common/thingworx/widgets/gridadvanced/common/images/';
            this._structPath = '../Common/thingworx/widgets/gridadvanced/common/';
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
            this._executeSelectedRowCallback = true;
            this._isTreeGrid = isTreeGrid;
            this._hiddenColumns = [];
            this._iconStyles = '';
            this._editMode = false;
            this._l8nTokens = {
                edit: 'Edit',
                save: 'Save',
                cancel: 'Cancel',
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
                freeMemoryWarning: 'Please wait while we clear the row cache to free up memory, this may take a minute...'
            };
            this._searchValue = '';
            this._cellClassNames = new Map();
            this._cellClassMap = new Map();

            this._gridEntBoxParentElement = (0, _jquery2.default)(this._gridAdvanced.entBox).parent();
            this._gridEntBoxElement = (0, _jquery2.default)(this._gridAdvanced.entBox);
            this._gridObjBoxElement = (0, _jquery2.default)(this._gridAdvanced.obj);
            this._gridHdrBoxElement = (0, _jquery2.default)(this._gridAdvanced.hdrBox);
        }

        TwGridAdvanced.prototype._configureTable = function _configureTable() {
            if (this._cfg) {
                try {
                    this._performanceMonitor.startTime('_configureTable');
                    this._selectionHandler.configuration = this._cfg;
                    this._gridAdvanced.setImagePath(this._imagePath);
                    this._gridAdvanced.setHeader(this._dhtmlxTableData.headers, null, this._createHeaderStyles());
                    this._gridAdvanced.setColumnIds(this._dhtmlxTableData.columnIds);
                    if(this._cfg.enableTextFiltering && this._dhtmlxTableData.data.rows.length != 0) {
                        this._gridAdvanced._in_header_text_wildcard_filter = function (b, a) {
                            b.innerHTML = "<input type='text'>";
                            b.onclick = b.onmousedown = function(c) {
                                (c || event).cancelBubble = true;
                                return true;
                            }
                            ;
                            b.onselectstart = function() {
                                return (event.cancelBubble = true);
                            }
                            ;
                            this.makeFilter(b.firstChild, a);

                            b.firstChild._filter = function () {
                                var input = this.value; // gets the text of the filter input and we transform it into regex
                                var inputEscaped = input.replace(/[\-\[\]\/\{\}\(\)\+\?\.\\\^\$\|]/g, "\\$&"); // escape the regex text in the input other that start wildcard
                                var inputRegex = new RegExp("^" + this.value.replace(/\*/gi, "(.*)") + "(.*)", 'i');
                                return function (value, id) {
                                    var textValue;
                                    if (!value) {
                                        textValue = "";
                                    } else if (value.toString().match("^<.*>$")) {
                                        textValue = $(value).text();
                                    } else {
                                        textValue = value.toString();
                                    }
                                    // checks if the value of a cell has the text from the filter
                                    if (textValue.match(inputRegex)) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                }
                            }

                        }
						var globalFilterType = this._cfg.textFilteringType;
                        var filters = this._gridAdvanced.columnIds.map((value) => {
                            var t = this._cfg._columnDefinitions.filter((val) => {
                                return val._fieldName == value;
                            })[0];
                            var result = " ";
                            if (t.headerFilter) {
                                if (t.headerFilter == "none") {
                                    result = "#" + globalFilterType;
                                } else if (t.headerFilter == "noDisplay") {
                                    result = " ";
                                } else {
                                    result = "#" + t.headerFilter;
                                }
                            } else {
                                result = "#" + globalFilterType;
                            }
                            return result;
                        })

                        this._gridAdvanced.attachHeader(filters.join(","));
                    }
                    if(this._cfg.enableBlockSelection) {
                        this._gridAdvanced.enableBlockSelection();
                        var self = this;
                        this._gridAdvanced.attachEvent("onKeyPress",function (code,ctrl,shift){
                            if(code==67&&ctrl){
                                if (!self._gridAdvanced._selectionArea) return alert("You need to select a block area in grid first");
                                self._gridAdvanced.setCSVDelimiter(",");
                                self._gridAdvanced.copyBlockToClipboard();
                                };
                            return true;
                        });
                    }
                    this._configureLayout();
                    this._gridAdvanced.enableColumnMove(true, this._dhtmlxTableData.createColumnMoveSettings(this._isTreeGrid));
                    this._gridAdvanced.enableColumnAutoSize(true);
                    this._createPaginationControls();
                    this._createSearchControls();
                    this._createEditButtons();
                    this._createResetButton();
                    this._gridAdvanced.setInitWidths(this._createColumnWidths());
                    this._gridAdvanced.setColAlign(this._createColumnAlignments());
                    this._gridAdvanced.setColTypes(this._dhtmlxTableData.createColumnTypes(this._isTreeGrid, this._cfg.cellEditingEnabled));
                    this._gridAdvanced.enableContextMenu(this._menu);
                    this._gridAdvanced.enableMultiline(true);
                    this._enableTreeCellEdit();
                    this._createFooter();
                    this._columnSortHandler.setColumnSortDataTypes(this._dhtmlxTableData.columns);
                    this._gridAdvanced.setEditable(this._editMode);
                    this._gridAdvanced.enableEditEvents(true, this._editMode, true);
                    this._gridAdvanced.enableMarkedCells(this._editMode);
                    this._gridAdvanced.setDateFormat("%Y-%m-%d %H:%i:%s");
                    this._gridAdvanced.init();
                    this._gridAdvanced.setRowTextStyle(this._createCellTextWrapStyle('clipped'));
                    this._gridAdvanced.kidsXmlFile = '-';
                    this._enableSmartRendering(1);
                    this._performanceMonitor.startTime('parse');
                    this._gridAdvanced.parse(this._dhtmlxTableData.data, 'json');
                    this._performanceMonitor.endTime('parse');
                    this._orderColumns();
                    this._setupRowSelectionBindings();
                    this._columnSortHandler.setColumnSort();
                    this._expandLoadedRows();
                    this._readUserGridSettings();
                    this._enableColumnSettingPersistence();
                    this._formatRowsInView();
                    this._generatePaginationAndSearchControls();
                    this._attachEvents();
                    this._toggleDefaultTooltips();
                    this._resizePaginationControls();
                    this._selectionHandler.refreshSelections(this._executeSelectedRowCallback);
                    this._selectedRows = this._selectionHandler.selectedRows;
                    this._setDefaultRowSelections();
                    this._resetSearch();

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
                    this._updateQueryData = value !== undefined;
                    this._updatedQueryFilter = value;
                    break;
                case 'IsEditable':
                    this.updateEditMode(value, value === true);
                    break;
                case 'FooterData':
                    this._updateFooterData = true;
                    this._updatedFooterData = value;
                    break;
                default:
                    break;
            }
            this.refresh();
        };

        TwGridAdvanced.prototype.refresh = function refresh() {
            var loadData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            this._performanceMonitor.startTime('refresh');
            this._currentPage = 1;
            if (this._updatedCfg) {
                this._cfg = this._updatedCfg;

                //this._cfg.paginationSettings.enabled = this._mockMode ? this._cfg.paginationSettings.enabled : false;
                this._editMode = this._cfg.cellEditingEnabled;
                this._updatedCfg = undefined;
                this._updateData = this._updatedData !== undefined;
                this._resetColumnSort();
                if (this._enableFilterEventOnConfigChange) {
                    this._queryData();
                }
            }
            if (this._cfg) {
                if (this._updateData && !this._cfg.enableFooter || this._updatedData && this._cfg.enableFooter && this._updateFooterData) {
                    if (this._updateData && loadData) {
                        this._dhtmlxTableData = new _dhtmlxTableData.DhtmlxTableData(this._updatedData, this._cfg, this.localizationUtil);
                    } else {
                        this._dhtmlxTableData.resetFormatted();
                    }

                    this._updateData = !this._updateData;
                    if (this._updateFooterData) {
                        this._dhtmlxTableData.orderFooterData(this._updatedFooterData);
                    }

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
                        this._setDefaultRowSelections();
                    }
                    if (this._updatedExpandRows) {
                        this._expandLoadedRows(false);
                    }
                    if (this._cfg.rowDefinition && this._updatedDefaultSelectedRows) {
                        this._cfg.rowDefinition.defaultSelectedRows = _configurationParser.ConfigurationParser.convertDefaultSelectedRows(this._updatedDefaultSelectedRows);
                        this._updatedDefaultSelectedRows = undefined;
                        this._selectedRows = [];
                        this._setDefaultRowSelections();
                    }
                    if (this._updateQueryData) {
                        this._queryData();
                        this._updateQueryData = false;
                    }
                }
                this._updateStyles();
            }
            this._applyDefaultRowSelections = true;
            this._executeSelectedRowCallback = true;
            this._performanceMonitor.endTime('refresh');
        };

        TwGridAdvanced.prototype.updateEditMode = function updateEditMode(mode, reloadData) {
            this._enableFilterEventOnConfigChange = false;
            if (mode === false && this._dhtmlxTableData) {
                this._dhtmlxTableData.clearEditedInfoTableRows();
            }
            this._cfg.cellEditingEnabled = mode;
            this._updatedCfg = this._cfg;
            this.refresh(reloadData);
            this._enableFilterEventOnConfigChange = true;
        };

        TwGridAdvanced.prototype.destroy = function destroy() {
            this._maxRowCacheReached = false;

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
            if (this._editButtonsToolbarElement) {
                this._editButtonsToolbarElement.remove();
                this._editButtonsToolbarElement = undefined;
            }
            if (this._selectionHandler) {
                this._selectionHandler.removeBindings();
            }
        };

        TwGridAdvanced.prototype.expandOrCollapseRow = function expandOrCollapseRow(rowId) {
            var doubleClicked = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!doubleClicked || doubleClicked && this._cfg.expandRowOnDoubleClick) {
                var gridRow = this._dhtmlxTableData.getRowById(rowId);
                var childGridHandler = this._createChildGridHandler();
                if (!this._gridAdvanced.getOpenState(rowId) && gridRow.hasChildren) {
                    if (!this._exceedsMaxRowCacheSize()) {
                        childGridHandler.expandChildGrid(gridRow.id, this._getQueryData());
                        this._saveRowExpansionState();
                    } else {
                        this._maxRowCacheReached = false;
                        this._showMaxRowCacheExceededMessage();
                    }
                } else {
                    this._showClearingCacheMessage(gridRow.rows.length);
                    childGridHandler.collapseChildGrid(gridRow.id);
                    this._saveRowExpansionState();
                    this._maxRowCacheExceededMsgShown = false;
                }
            }
        };

        TwGridAdvanced.prototype.selectRows = function selectRows(selectedRows, selectedRowIndexes, fromWidgetUpdate) {
            if (selectedRows && this._isTreeGrid) {
                var selectedRowIds = selectedRows.map(function (gridRow) {
                    return gridRow.id;
                });
                this._selectionHandler.setSelectionsById(selectedRowIds);
            } else if (selectedRowIndexes) {
                this._selectionHandler.setSelections(selectedRowIndexes, fromWidgetUpdate);
            }
        };

        TwGridAdvanced.prototype._initMenu = function _initMenu() {
            this._menu = new dhtmlXMenuObject();
            this._menu.renderAsContextMenu();
            this._menu.setIconsPath(this._menuIconsPath);
        };

        TwGridAdvanced.prototype._enableTreeCellEdit = function _enableTreeCellEdit() {
            if (this._isTreeGrid && (this._cfg.cellEditingEnabled === true || this._cfg.editButtons && this._cfg.editButtons.enabled === true)) {
                this._gridAdvanced.enableTreeCellEdit(this._dhtmlxTableData.treeColumnEditable);
            }
        };

        TwGridAdvanced.prototype._configureLayout = function _configureLayout() {
            this._gridAdvanced.enableRowsHover(true, 'grid_hover');
            if (this._responsiveLayout) {
                this._gridAdvanced.enableAutoWidth(false);
                this._gridAdvanced.enableAutoHeight(false);
                this._gridEntBoxParentElement.css('overflow', 'hidden');
            } else {
                var containerHeight = this._gridEntBoxParentElement.height();
                var containerWidth = this._gridEntBoxParentElement.width();
                this._gridEntBoxElement.css('height', containerHeight);
                this._gridEntBoxElement.css('width', containerWidth);
                this._gridObjBoxElement.height(containerHeight);
            }
        };

        TwGridAdvanced.prototype.resize = function resize() {
            this._updateColumnConfigWidths();
            if (this._cfg && this._cfg.rowDefinition && this._cfg.rowDefinition.autoScroll) {
                this._selectionHandler.autoScrollToLastSelected();
            }
            this._updateStyles();
        };

        TwGridAdvanced.prototype._getGridBoxParentDimensions = function _getGridBoxParentDimensions() {
            return {
                height: this._gridEntBoxParentElement.height(),
                width: this._gridEntBoxParentElement.width()
            };
        };

        TwGridAdvanced.prototype._getGridObjBoxElementHeight = function _getGridObjBoxElementHeight() {
            return (0, _jquery2.default)(this._gridAdvanced.entBox).find('.objbox').height();
        };

        TwGridAdvanced.prototype._includeScrollOffset = function _includeScrollOffset() {
            var scrollBars = false;
            if (this._gridEntBoxElement && this._gridObjBoxElement && this._gridHdrBoxElement) {
                scrollBars = this._gridObjBoxElement.outerHeight() >= parseInt(this._gridEntBoxElement.height, 10) - this._gridHdrBoxElement.height();
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

            return outerDivWidth - innerDivWidth + 1;
        };

        TwGridAdvanced.prototype._resizeColumns = function _resizeColumns() {
            var _this = this;

            this._performanceMonitor.startTime('resizeColumns');
            this._updateColumnConfigWidths();
            if (this._columnConfigs) {
                this._gridObjBoxElement.css('overflow', 'hidden');

                setTimeout(function (gridAdvanced) {
                    if (gridAdvanced) {
                        _this._gridObjBoxElement.css('overflow', 'auto');
                    }
                }, 1, this._gridAdvanced);
            }
            (0, _jquery2.default)(this._gridAdvanced.entBox).children('.xhdr').css('height', 'auto');
            this._performanceMonitor.endTime('resizeColumns');
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

        TwGridAdvanced.prototype._updateStyles = function _updateStyles() {
            this._styleHandler = new _gridStyleHandler.GridStyleHandler(this._gridAdvanced, this._cfg, this._gridId, this._generateInitialWordWrap());
            this._styleHandler.updateStyles(this._cellClassNames);
        };

        TwGridAdvanced.prototype._formatColumns = function _formatColumns(columns, gridRow) {
            var _this2 = this;

            if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDefinition, columnIndex) {
                    var cellIndex = _this2._gridAdvanced.getColIndexById(columnDefinition.fieldName);
                    var styles = gridRow && gridRow.style ? gridRow.style : '';
                    if (columnDefinition && columnDefinition.inLayout && columnDefinition.columnFormatter && _this2._styleHandler !== undefined) {
                        var stateDefinition = columnDefinition.columnFormatter.stateDefinition;
                        var defaultRowStyle = gridRow.dataIndex % 2 === 0 ? _this2._styleHandler.styleMap.get('rowAlternateBackgroundStyle') : _this2._styleHandler.styleMap.get('rowBackgroundStyle');
                        if (stateDefinition && stateDefinition.fieldName && stateDefinition.type !== 'fixed') {
                            var stateValueColumnIndex = _lodashAmd2.default.findIndex(columns, function (column) {
                                return column === stateDefinition.fieldName;
                            });
                            if (stateValueColumnIndex !== undefined) {
                                var value = gridRow.rawData[stateValueColumnIndex];
                                styles = _gridStyleHandler.GridStyleHandler.cascadeCellStyles(gridRow.style, columnDefinition.columnFormatter.getColumnStyles(value), defaultRowStyle);
                            } else {
                                _logger.Logger.warn('Could not format column "' + columnDefinition.fieldName + '" using state definition "' + stateDefinition.name + '". No column found with state definition field name "' + stateDefinition.fieldName + '"');
                            }
                        } else if (stateDefinition) {
                            var _value = gridRow.rawData[columnIndex];
                            styles = _gridStyleHandler.GridStyleHandler.cascadeCellStyles(gridRow.style, columnDefinition.columnFormatter.getColumnStyles(_value), defaultRowStyle);
                        }
                    }
                    if (columnDefinition && columnDefinition.inLayout) {
                        styles += _this2._createCellTextWrapStyle(columnDefinition.overflow);
                    }
                    if (columnDefinition.columnIndex > -1 && cellIndex > -1) {
                        var rowCell = _this2._gridAdvanced.cells(gridRow.id, cellIndex).cell;
                        var cellCssClassName = void 0;
                        if (_this2._cellClassNames.has(styles)) {
                            cellCssClassName = _this2._cellClassNames.get(styles);
                        } else if (styles) {
                            cellCssClassName = 'cell_style' + _this2._cellClassNames.size;
                            _this2._cellClassNames.set(styles, cellCssClassName);
                        }
                        if (cellCssClassName) {
                            (0, _jquery2.default)(rowCell).addClass(cellCssClassName);
                            if (_this2._mockMode) {
                                _this2._cellClassMap.set(gridRow.id + ',' + cellIndex, cellCssClassName);
                            }
                        }
                    }
                });
            }
        };

        TwGridAdvanced.prototype._createHeaderStyles = function _createHeaderStyles() {
            var _this3 = this;

            this._performanceMonitor.startTime('createHeaderStyles');
            var headerStyles = [];
            if (this._dhtmlxTableData.columns) {
                this._dhtmlxTableData.columns.forEach(function (column) {
                    if (_this3._cfg.headerDefinition) {
                        var styles = _this3._createCellTextWrapStyle(_this3._cfg.headerDefinition.overflow);
                        if (_this3._cfg.headerDefinition.alignHeader || _this3._cfg.columnDefinitions[0].headerTextAlignment) {
                            var colAlign = _this3._getColumnAlignment(column);
                            styles += 'text-align:' + (colAlign || 'left') + ';';
                        }
                        styles += 'max-height:' + _this3._cfg.headerDefinition.maxHeight + 'px;overflow-y:auto;';
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
            var _this4 = this;

            if (this._cfg && this._cfg.rowFormatter) {
                if (this._cfg.rowFormatter.stateDefinition && this._cfg.rowFormatter.stateDefinition.type !== 'fixed' && columns) {
                    columns.forEach(function (column, index) {
                        if (column === _this4._cfg.rowFormatter.stateDefinition.fieldName) {
                            _this4._cfg.rowFormatter.format(gridRow, gridRow.rawData[index]);
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
                    }
                }
            }
        };

        TwGridAdvanced.prototype._generateInitialWordWrap = function _generateInitialWordWrap() {
            var _this5 = this;

            var wordWrap = this._createCellTextWrapStyle('clipped');
            if (this._cfg && this._cfg.columnDefinitions) {
                var wrap = void 0;
                this._cfg.columnDefinitions.forEach(function (columnDefinition, columnIndex) {
                    if (columnDefinition && columnDefinition.inLayout && columnDefinition.columnFormatter) {
                        if (wrap === undefined && columnDefinition.overflow === 'wrapped') {
                            wrap = wordWrap = _this5._createCellTextWrapStyle('wrapped');
                        }
                    }
                });
            }
            return wordWrap;
        };

        TwGridAdvanced.prototype._createCellTextWrapStyle = function _createCellTextWrapStyle(overflow) {
            var style = '';
            switch (overflow) {
                case 'fitted':
                    style += 'word-wrap:break-word;';
                    style += 'white-space:normal;';
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
            var _this6 = this;

            gridRow.rawData.forEach(function (rawValue, index) {
                var columnDef = _this6._cfg.findColumnDefinition(keys[index]);
                if (columnDef.inLayout) {
                    var columnIndex = _this6._gridAdvanced.getColIndexById(columnDef.fieldName);
                    var stateValueColumnIndex = _this6._findStateValueColumnIndex(keys, columnDef);
                    var stateValue = stateValueColumnIndex > -1 ? gridRow.rawData[stateValueColumnIndex] : rawValue;

                    var editMode = false;
                    if (columnDef.isCheckboxFormatter()) {
                        editMode = _this6._editMode && columnDef.columnFormatter.cellEditor.isEnabled;
                    }
                    var renderCell = columnDef.render(rawValue, stateValue, editMode);
                    if (renderCell) {
                        _this6._gridAdvanced.cells(gridRow.id, columnIndex).setValue(renderCell.value);
                        if (columnDef.columnFormatter && columnDef.columnFormatter.valueConverter && columnDef.columnFormatter.valueConverter.type === 'boolean' && columnDef.columnFormatter.valueConverter.valueFormat !== 'checkbox') {
                            var columnType = _this6._isTreeGrid && columnIndex === 0 ? 'tree' : renderCell.columnType;
                            _this6._gridAdvanced.setCellExcellType(gridRow.id, columnIndex, columnType);
                        }
                    }
                }
            });
        };

        TwGridAdvanced.prototype._findStateValueColumnIndex = function _findStateValueColumnIndex(keys, columnDefinition) {
            var stateValueColumnIndex = -1;
            if (columnDefinition && columnDefinition.columnFormatter) {
                var stateDefinition = columnDefinition.columnFormatter.stateDefinition;
                if (stateDefinition && stateDefinition.fieldName) {
                    stateValueColumnIndex = _lodashAmd2.default.findIndex(keys, function (column) {
                        return column === stateDefinition.fieldName;
                    });
                }
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
            var _this7 = this;

            var selections = [];
            if (this._dhtmlxTableData) {
                selectedRows.forEach(function (sRow) {
                    var sId = sRow[_this7._cfg.idFieldName];
                    _this7._dhtmlxTableData.data.rows.forEach(function (tRow, index) {
                        if (sId == tRow.id) {
                            selections.push(index);
                        }
                    });
                });
            }
            return selections;
        };

        TwGridAdvanced.prototype._orderColumns = function _orderColumns(cookieConfig) {
            var _this8 = this;

            this._performanceMonitor.startTime('orderColumns');
            this._ignoreColumnMoveEvents = true;
            if (cookieConfig) {
                cookieConfig.columnOrder.forEach(function (columnIndex, currentIndex) {
                    var columnId = _this8._dhtmlxTableData.columns[columnIndex];
                    var currentLocation = _this8._gridAdvanced.getColIndexById(columnId);
                    if (currentIndex !== currentLocation) {
                        _this8._gridAdvanced.moveColumn(currentLocation, currentIndex);
                    }
                });
            } else if (this._cfg && this._cfg.columnDefinitions) {
                this._cfg.columnDefinitions.forEach(function (columnDef) {
                    if (columnDef.inLayout) {
                        var currentIndex = _this8._gridAdvanced.getColIndexById(columnDef.fieldName);
                        if (currentIndex >= 0) {
                            if (currentIndex !== columnDef.columnIndex) {
                                _this8._gridAdvanced.moveColumn(currentIndex, columnDef.columnIndex);
                            }
                        }
                    }
                });
            }
            this._ignoreColumnMoveEvents = false;
            this._performanceMonitor.endTime('orderColumns');
        };

        TwGridAdvanced.prototype._createColumnWidths = function _createColumnWidths() {
            var _this9 = this;

            this._columnConfigs = [];
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this9._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this9._cfg.findColumnDefinition(columnId);
                        if (columnDef) {
                            var width = columnDef.autoWidth ? '*' : columnDef.width;
                            _this9._columnConfigs.push({
                                id: columnId,
                                width: width,
                                hidden: columnDef.hidden,
                                index: index
                            });
                        }
                    }
                });
                this._columnConfigs.forEach(function (columnConfig) {
                    _logger.Logger.debug("createColumnWidths(): Initial column config: " + 'id: ' + columnConfig.id + ' index: ' + columnConfig.index + ' width: ' + columnConfig.width + ' hidden: ' + columnConfig.hidden);
                });
            }
            return this._updateColumnConfigWidths(true);
        };

        TwGridAdvanced.prototype._createColumnAlignments = function _createColumnAlignments() {
            var _this10 = this;

            var alignments = '';
            if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this10._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this10._cfg.findColumnDefinition(columnId);
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

        TwGridAdvanced.prototype._updateColumnVisibility = function _updateColumnVisibility() {
            var _this11 = this;

            if (this._columnConfigs && this._userSettingHandler && this._userSettingHandler.hasUserSetting('gridSettings')) {
                this._columnConfigs.forEach(function (col, index) {
                    if (col.hidden !== undefined) {
                        var _index = _this11._gridAdvanced.getColIndexById(col.id);
                        _this11._gridAdvanced.setColumnHidden(_index, col.hidden);
                    }
                });
            } else if (this._cfg && this._cfg.columnDefinitions) {
                this._dhtmlxTableData.columns.forEach(function (column, index) {
                    var columnId = _this11._gridAdvanced.getColumnId(index);
                    if (columnId) {
                        var columnDef = _this11._cfg.findColumnDefinition(columnId);
                        if (columnDef) {
                            _this11._gridAdvanced.setColumnHidden(index, columnDef.hidden);
                        }
                    }
                });
            }
        };

        TwGridAdvanced.prototype._areAllColumnsHidden = function _areAllColumnsHidden() {
            var allColumnsHidden = true;
            var startIndex = 0;
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

        TwGridAdvanced.prototype._createFooter = function _createFooter() {
            var _this12 = this;

            if (this._cfg.enableFooter === true) {
                this._dhtmlxTableData.footers.forEach(function (footer) {
                    _this12._gridAdvanced.attachFooter(footer.settings, footer.alignments);
                });
            }
        };

        TwGridAdvanced.prototype._removeFooter = function _removeFooter() {
            var _this13 = this;

            if (this._cfg.enableFooter === true) {
                this._dhtmlxTableData.footers.forEach(function (footer, index) {
                    _this13._gridAdvanced.detachFooter(index);
                });
            }
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

        TwGridAdvanced.prototype._createEditButtons = function _createEditButtons() {
            var _this14 = this;

            if (this._cfg.editButtons && this._cfg.editButtons.enabled) {
                var _cfg$editButtons$loca = this._cfg.editButtons.location.split('-'),
                    vertAlign = _cfg$editButtons$loca[0],
                    align = _cfg$editButtons$loca[1];

                var editButtonsToolbarId = this._gridId + '-editButtons-container';
                if (!this._editButtonsToolbarElement) {
                    this._editButtonsToolbarElement = (0, _jquery2.default)('<div style="display:inline-block;float:' + align + ';" id="' + editButtonsToolbarId + '"></div>');
                    if (align === 'right') {
                        (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').prepend(this._editButtonsToolbarElement);
                    } else {
                        (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').append(this._editButtonsToolbarElement);
                    }
                }

                var toolbar = new dhtmlXToolbarObject(editButtonsToolbarId);
                var buttonIndex = 0;
                if (this._enableReset) {
                    var _resetLocation$split = this._resetLocation.split('-'),
                        rVertAlign = _resetLocation$split[0],
                        rAlign = _resetLocation$split[1];

                    if (rVertAlign === vertAlign && rAlign === align) {
                        toolbar.addSeparator('editSeparator', buttonIndex++);
                    }
                }
                if (this._cfg.searchSettings.enabled && buttonIndex === 0) {
                    var sVertAlign = this._cfg.searchSettings.location;
                    var sAlign = this._cfg.searchSettings.alignment;
                    if (sVertAlign === vertAlign && sAlign === align) {
                        toolbar.addSeparator('editSeparator', buttonIndex++);
                    }
                }
                toolbar.addButton('editBtn', 1, this._l8nTokens.edit);
                toolbar.addButton('saveBtn', 2, this._l8nTokens.save);
                toolbar.addButton('cancelBtn', 3, this._l8nTokens.cancel);
                toolbar.attachEvent('onClick', function (id) {
                    if (id === 'editBtn') {
                        _this14.updateEditMode(true, true);
                        _this14._gridEditCallback(0);
                        _this14._displayEditButtons(toolbar, id);
                    } else if (id === 'saveBtn') {
                        var rows = _this14._dhtmlxTableData.updateEditedInfoTableRows();
                        if (rows.length > 0) {
                            _this14._gridEditCallback(1);
                            _this14._dhtmlxTableData.clearEditedInfoTableRows();
                        }
                        _this14.updateEditMode(false, false);
                        _this14._displayEditButtons(toolbar, id);
                    } else if (id === 'cancelBtn') {
                        _this14.updateEditMode(false, true);
                        _this14._dhtmlxTableData.clearEditedInfoTableRows();
                        _this14._gridEditCallback(2);
                        _this14._displayEditButtons(toolbar, id);
                    }
                });
                this._displayEditButtons(toolbar, this._editMode === true ? 'editBtn' : 'saveBtn');
                toolbar.setAlign(align);
            }
        };

        TwGridAdvanced.prototype._displayEditButtons = function _displayEditButtons(toolbar, id) {
            if (id === 'editBtn') {
                toolbar.hideItem('editBtn');
                toolbar.showItem('saveBtn');
                toolbar.showItem('cancelBtn');
            } else if (id === 'saveBtn') {
                toolbar.showItem('editBtn');
                toolbar.hideItem('saveBtn');
                toolbar.hideItem('cancelBtn');
            } else if (id === 'cancelBtn') {
                toolbar.showItem('editBtn');
                toolbar.hideItem('saveBtn');
                toolbar.hideItem('cancelBtn');
            }
        };

        TwGridAdvanced.prototype._createResetButton = function _createResetButton() {
            var _this15 = this;

            if (this._cfg.resetButton) {
                this._enableReset = this._cfg.resetButton.enabled;
                this._resetLocation = this._cfg.resetButton.location;
            }

            var _resetLocation$split2 = this._resetLocation.split('-'),
                vertAlign = _resetLocation$split2[0],
                align = _resetLocation$split2[1];

            if (this._enableReset) {
                var resetToolbarId = this._gridId + '-reset-container';
                if (!this._resetToolbarElement) {
                    this._resetToolbarElement = (0, _jquery2.default)('<div style="display:inline-block;float:' + align + ';" id="' + resetToolbarId + '"></div>');
                    if (align === 'right') {
                        (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').prepend(this._resetToolbarElement);
                    } else {
                        (0, _jquery2.default)('#' + this._gridId + '-' + vertAlign + '-container').append(this._resetToolbarElement);
                    }
                }

                var toolbar = new dhtmlXToolbarObject(resetToolbarId);
                var buttonIndex = 0;
                if (this._cfg.editButtons && this._cfg.editButtons.enabled) {
                    var _cfg$editButtons$loca2 = this._cfg.editButtons.location.split('-'),
                        eVertAlign = _cfg$editButtons$loca2[0],
                        eAlign = _cfg$editButtons$loca2[1];

                    if (eVertAlign === vertAlign && eAlign === align) {
                        toolbar.addSeparator('editSeparator', buttonIndex++);
                    }
                }
                if (this._cfg.searchSettings.enabled && buttonIndex === 0) {
                    var sVertAlign = this._cfg.searchSettings.location;
                    var sAlign = this._cfg.searchSettings.alignment;
                    if (sVertAlign === vertAlign && sAlign === align) {
                        toolbar.addSeparator('editSeparator', buttonIndex++);
                    }
                }

                toolbar.addButton('resetBtn', buttonIndex, this._l8nTokens.reset);
                toolbar.attachEvent('onClick', function (id) {
                    _this15._resetGrid(true);
                });
                toolbar.setAlign(align);
            }
        };

        TwGridAdvanced.prototype._resetGrid = function _resetGrid(refresh) {
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled) {
                this._userSettingHandler.resetUserSetting('gridSettings');
                this._userSettingHandler.resetUserSetting('sortGridColumns');
                this._userSettingHandler.resetUserSetting('gridOpen');
            }
            this._updatedCfg = this._cfg;
            var searchElem = (0, _jquery2.default)('#' + this._gridId + '-search-container .dhxtoolbar_input');
            searchElem.val('');
            this._searchValue = '';
            this._applyDefaultRowSelections = true;
            this._executeSelectedRowCallback = true;
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
            var _this16 = this;

            this._performanceMonitor.startTime('generatePaginationControls');
            if (this._cfg.paginationSettings) {
                var pagingEnabled = this._cfg.paginationSettings.enabled;
                var pagingSetting = this._cfg.paginationSettings.pagingType;
                if (pagingEnabled) {
                    var pagingToolBar = this._gridAdvanced.aToolBar;
                    if (pagingSetting !== 'simple') {
                        pagingToolBar.addText('totalRows', 3, 'of ' + this._gridAdvanced.getRowsNum());
                    }
                    if (pagingSetting === 'full_numbers' || pagingSetting === 'full') {
                        pagingToolBar.addText('pagesText', 4, 'Page');
                        this._createPageButtons(pagingToolBar, 1);
                        pagingToolBar.attachEvent('onClick', function (id) {
                            if (id.indexOf('pageBtn') > -1) {
                                var pageNum = id.substring(7, id.length);
                                _this16._gridAdvanced.changePage(pageNum);
                            } else if (id.indexOf('perpagenum') > -1) {
                                var pageSize = id.substring(11, id.length);
                                _this16._gridAdvanced.changePage(1);
                                _this16._cfg.paginationSettings.pageLength = pageSize;
                                _this16._deletePageButtons(pagingToolBar);
                                _this16._createPageButtons(pagingToolBar, 1);
                            }
                        });
                    }
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
            var _this17 = this;

            var pagingSetting = this._cfg.paginationSettings.pagingType;
            var minToolbarWidth = arrowButtonWidth * 4;
            var simpleNumbersMinWidth = minToolbarWidth + resultsWidth + totalRowsWidth + 16;
            var fullNumbersMinWidth = pageTextWidth + pageButtonWidth * this._cfg.paginationSettings.totalPageButtons + simpleNumbersMinWidth;
            var fullMinWidth = fullNumbersMinWidth + rowsPerPageWidth;

            this._gridAdvanced.aToolBar.forEachItem(function (itemId) {
                if (currentToolbarWidth < simpleNumbersMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers' || pagingSetting === 'simple_numbers')) {
                    if (itemId === 'results' || itemId.indexOf('pageBtn') > -1 || itemId === 'pagesText' || itemId === 'perpagenum' || itemId === 'totalRows') {
                        _this17._gridAdvanced.aToolBar.hideItem(itemId);
                    }
                }
                if (currentToolbarWidth >= simpleNumbersMinWidth && currentToolbarWidth < fullNumbersMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers' || pagingSetting === 'simple_numbers')) {
                    if (itemId.indexOf('pageBtn') > -1 || itemId === 'perpagenum' || itemId === 'pagesText') {
                        _this17._gridAdvanced.aToolBar.hideItem(itemId);
                    } else if (itemId === 'results' || itemId === 'totalRows') {
                        _this17._gridAdvanced.aToolBar.showItem(itemId);
                    }
                }
                if (currentToolbarWidth >= fullNumbersMinWidth && currentToolbarWidth < fullMinWidth && (pagingSetting === 'full' || pagingSetting === 'full_numbers')) {
                    if (itemId === 'perpagenum') {
                        _this17._gridAdvanced.aToolBar.hideItem(itemId);
                    } else if (itemId === 'pagesText' || itemId.indexOf('pageBtn') > -1) {
                        _this17._gridAdvanced.aToolBar.showItem(itemId);
                    }
                } else if (currentToolbarWidth >= fullMinWidth) {
                    if (pagingSetting === 'simple_numbers' && (itemId === 'results' || itemId === 'totalRows')) {
                        _this17._gridAdvanced.aToolBar.showItem(itemId);
                    }
                    if ((pagingSetting === 'full_numbers' || pagingSetting === 'full') && (itemId.indexOf('pageBtn') > -1 || itemId === 'pagesText')) {
                        _this17._gridAdvanced.aToolBar.showItem(itemId);
                    }
                    if (pagingSetting === 'full' && itemId === 'perpagenum') {
                        _this17._gridAdvanced.aToolBar.showItem(itemId);
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
                saveSortColumnUserSettings = this._userSettingHandler.readSetting('sortGridColumns');
            }

            if (!isScrolling) {
                this._columnSortHandler.setColumnSort(saveSortColumnUserSettings);
            }

            var totalRows = this._gridAdvanced.getRowsNum();
            if (this._cfg && this._cfg.paginationSettings.enabled) {
                topRowIndex = (this._currentPage - 1) * this._cfg.paginationSettings.pageLength;
                bottomRowIndex = topRowIndex + this._cfg.paginationSettings.pageLength;
            } else {
                var state = this._gridAdvanced.getStateOfView();
                var visibleHeight = this._getGridObjBoxElementHeight();
                var visibleRowCount = parseInt(visibleHeight / this._cfg.rowDefinition.minRowHeight, 10);
                topRowIndex = state[0] - 100 < 0 ? 0 : state[0] - 100;

                bottomRowIndex = state[0] + visibleRowCount + 100;
                bottomRowIndex = bottomRowIndex < totalRows ? bottomRowIndex : totalRows;
            }
            this._formatRowRange(topRowIndex, bottomRowIndex);
            this._columnSortHandler.removeColumnSortStyles();
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
        };

        TwGridAdvanced.prototype._createChildGridHandler = function _createChildGridHandler() {
            var _this18 = this;

            return new _childGridHandler.ChildGridHandler(this._gridId, this._gridAdvanced, this._dhtmlxTableData, this._childDataServiceInvoker, this.childDataServiceParameters(), this._cfg, function () {
                _this18._resizeColumns();
                _this18._formatRowsInView();
                _this18._selectionHandler.refreshSelections();
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

        TwGridAdvanced.prototype._attachEvents = function _attachEvents() {
            var _this19 = this;

            this._gridAdvanced.attachEvent('onDynXLS', function (rowId) {
                _this19.expandOrCollapseRow(rowId);
            });

            this._gridAdvanced.attachEvent('onOpenEnd', function (rowId, state) {
                var gridRow = _this19._dhtmlxTableData.getRowById(rowId);
                if (state === 1) {
                    var clearCache = _this19._dhtmlxTableData.hasRowExpired(rowId, _this19._gridAdvanced.getRowsNum());
                    if (clearCache) {
                        _this19._createChildGridHandler()._deleteChildItems(rowId);
                        _this19._gridAdvanced.openItem(rowId);
                        return;
                    }
                    gridRow.isExpanded = true;

                    _this19._formatRowsInView();
                } else {
                    var childGridHandler = _this19._createChildGridHandler();
                    _this19._showClearingCacheMessage(gridRow.rows.length);
                    childGridHandler.collapseChildGrid(rowId);
                    _this19._maxRowCacheExceededMsgShown = false;
                }
                _this19._resizeColumns();
                _this19._saveRowExpansionState();
            });

            this._gridAdvanced.attachEvent('onColumnHidden', function (index, state) {
                var allColumnsHidden = _this19._areAllColumnsHidden();
                if (allColumnsHidden) {
                    _this19._gridAdvanced.setColumnHidden(index, false);
                }
                var i = _this19._gridAdvanced.getColumnId(index);
                var cIndex = _lodashAmd2.default.findIndex(_this19._columnConfigs, function (columnConfig) {
                    return columnConfig.id === i;
                });
                _this19._columnConfigs[cIndex].hidden = state;

                _this19._resizeColumns();
                _this19._storeUserGridSettings();
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

            this._gridAdvanced.attachEvent('onResizeEnd', function () {
                _this19._storeUserGridSettings();
            });

            this._gridAdvanced.attachEvent('onCheck', function (rowId, cellIndex, state) {
                _this19._handleCheckBoxChanged(rowId, cellIndex, state);
            });

            this._gridAdvanced.attachEvent('onBeforeSorting', function (index, type, direction) {
                if (_this19._cfg.enableColumnSorting) {
                    if (!_this19._cfg.clientSideSorting) {
                        _this19._columnSortHandler.handleColumnSortEvent(index, type, direction);
                        _this19._queryData();
                        _this19._applyDefaultRowSelections = false;
                        _this19._executeSelectedRowCallback = false;
                    } else {
                        return true;
                    }
                }
                return false;
            });

            if (this._cfg && this._cfg._columnDefinitions && this._cfg._columnDefinitions.length > 0) {
                this._gridAdvanced.attachEvent('onMouseOver', this._showTooltip.bind(this));
            }

            if (this._cfg && this._cfg._headerDefinition && this._cfg._headerDefinition.overflow === 'tooltip') {
                this._gridEntBoxElement.find('.xhdr td').each(function (index, element) {
                    var id = _this19._gridAdvanced.getColumnId(index);
                    (0, _jquery2.default)(element).on('mouseenter', null, id, function (event) {
                        var columnDef = _this19._cfg.findColumnDefinition(event.data);
                        var objBox = (0, _jquery2.default)(_this19._gridAdvanced.entBox).find('.objbox');
                        var tooltipCfg = {
                            gridBoxScrollLeft: objBox.scrollLeft(),
                            gridBoxOffset: objBox.offset().left,
                            gridBoxOffsetTop: objBox.offset().top,
                            gridBoxHeight: objBox.height(),
                            gridBoxWidth: objBox.width(),
                            textAlignment: columnDef ? columnDef.headerTextAlignment : 'left',
                            minRowHeight: 30,
                            scrollWidth: _this19._includeScrollOffset() ? _this19._getScrollWidth() : 0
                        };
                        _this19._tooltip.setTooltip(columnDef.title, (0, _jquery2.default)(event.currentTarget), _this19._gridId, tooltipCfg);
                    });
                });
            }

            (0, _jquery2.default)('#' + this._gridId + ' .xhdr').mousedown(function (event) {
                if (event.which === 3) {
                    var styleBlockId = _this19._gridId + '_context_style';
                    (0, _jquery2.default)('.twx_grid_advanced_context_style').remove();
                    var idSelector = '#' + _this19._gridId;
                    var availableHeight = (0, _jquery2.default)(window).height() - event.pageY;
                    var styleRules = '.dhtmlxMenu_material_SubLevelArea_Polygon { height: ' + availableHeight + 'px } ';
                    _this19.contextMenuFocus = true;
                    setTimeout(function () {
                        var contextMenuContainer = (0, _jquery2.default)('.dhtmlxMenu_material_SubLevelArea_Polygon:visible');
                        var contextMenuId = contextMenuContainer.attr('id');
                        styleRules += '#' + contextMenuId + ' { display: block !important } ';
                        var listItems = contextMenuContainer.find('.sub_item').length;
                        var menuHeight = listItems * 30;
                        if (menuHeight > availableHeight) {
                            var styleBlock = '<style class="twx_grid_advanced_context_style" id="' + styleBlockId + '">' + styleRules + '</style>';
                            (0, _jquery2.default)(idSelector).prepend(styleBlock);
                        }
                        contextMenuContainer.mouseleave(function (event) {
                            _this19.contextMenuFocus = false;
                            setTimeout(function () {
                                if (!_this19.contextMenuFocus) {
                                    (0, _jquery2.default)('.twx_grid_advanced_context_style').remove();
                                }
                            }, 500);
                        });
                        contextMenuContainer.mouseover(function (event) {
                            _this19.contextMenuFocus = true;
                        });
                    }, 150);
                }
            });

            this._gridAdvanced.attachEvent('onAfterCMove', function (cInd, posInd) {
                _this19._storeUserGridSettings();
                _this19._updateColumnConfigWidths();

                if (_this19._cfg && _this19._cfg._headerDefinition && _this19._cfg._headerDefinition.overflow === 'tooltip') {
                    (0, _jquery2.default)(_this19._gridAdvanced.entBox).find('.xhdr td').each(function (index, element) {
                        var id = _this19._gridAdvanced.getColumnId(index);
                        (0, _jquery2.default)(element).on('mouseenter', null, id, function (event) {
                            var columnDef = _this19._cfg.findColumnDefinition(event.data);
                            var objBox = _this19._gridEntBoxElement.find('.objbox');
                            var tooltipCfg = {
                                gridBoxScrollLeft: objBox.scrollLeft(),
                                gridBoxOffset: objBox.offset().left,
                                gridBoxOffsetTop: objBox.offset().top,
                                gridBoxHeight: objBox.height(),
                                gridBoxWidth: objBox.width(),
                                textAlignment: columnDef.headerTextAlignment,
                                minRowHeight: 30,
                                scrollWidth: _this19._includeScrollOffset() ? _this19._getScrollWidth() : 0
                            };
                            _this19._tooltip.setTooltip(columnDef.title, (0, _jquery2.default)(event.currentTarget), _this19._gridId, tooltipCfg);
                        });
                    });
                }
            });

            this._gridAdvanced.attachEvent('onResize', function (col, size) {
                var cId = _this19._gridAdvanced.getColumnId(col);
                _this19._columnConfigs.forEach(function (column) {
                    if (column.id === cId) {
                        size = size < 20 ? 20 : size;
                        column.width = size + 'px';
                    }
                });
                _this19._resizeColumns();
            });

            this._gridAdvanced.attachEvent("onRowSelect", function (id, ind) {
                if (_jquery2.default.browser.mozilla) {
                    _this19._toggleFocus();
                }
            });

            (0, _jquery2.default)(this._gridAdvanced.entBox).mousemove(function (event) {
                if (_jquery2.default.browser.mozilla) {
                    var timeout = false;
                    if (!timeout) {
                        timeout = true;
                        setTimeout(function () {
                            var currentHover = (0, _jquery2.default)(_this19._gridAdvanced.entBox).find('.grid_hover').parent();
                            if (_this19.rowHover !== currentHover.get(0)) {
                                _this19.rowHover = currentHover.get(0);
                                _this19._toggleFocus();
                            }
                            timeout = false;
                        }, 10);
                    }
                }
            });

            this._gridAdvanced.attachEvent('onScroll', this._handleScrollEvent.bind(this));
            this._gridAdvanced.attachEvent('onCellChanged', this._handleCellChangeEvent.bind(this));
            this._gridAdvanced.attachEvent('onCellMarked', this._handleCellMarkedEvent.bind(this));
            this._gridAdvanced.attachEvent('onCellUnMarked', this._handleCellUnmarkedEvent.bind(this));
            this._gridAdvanced.attachEvent('onEditCell', this._handleEditCellEvent.bind(this));

            if (this._cfg.searchSettings.enabled) {
                var searchElem = (0, _jquery2.default)('#' + this._gridId + '-search-container .dhxtoolbar_input');
                searchElem.on('keyup', _lodashAmd2.default.debounce(function () {
                    _this19._searchValue = searchElem.val();
                    _this19._queryData();
                    _this19._applyDefaultRowSelections = false;
                    _this19._executeSelectedRowCallback = false;
                }, 1500));
            }

            (0, _jquery2.default)('#' + this._gridId + ' .xhdr').mousedown(function (event) {
                if (event.which === 3 && _this19._cfg.enableContextMenu) {
                    var styleBlockId = _this19._gridId + '_sub_menu_style';
                    (0, _jquery2.default)('#' + styleBlockId).remove();
                    var idSelector = '#' + _this19._gridId;
                    var styleRules = '.sub_item { display: none }';
                    var styleBlock = '<style id="' + styleBlockId + '">' + styleRules + '</style>';
                    (0, _jquery2.default)(idSelector).prepend(styleBlock);
                    var styleRemoved = false;

                    setTimeout(function () {
                        (0, _jquery2.default)('.dhtmlxMenu_material_SubLevelArea_Polygon:visible .sub_item').each(function (index, item) {
                            if (!styleRemoved) {
                                (0, _jquery2.default)('#' + styleBlockId).remove();
                                styleRemoved = true;
                            }
                        });
                    }, 200);
                }
            });
        };

        TwGridAdvanced.prototype._toggleFocus = function _toggleFocus() {
            var tempDiv = '<div id="gridFocusDiv" tabindex="10000" style="width: 0px; height: 0px;"></div>';
            (0, _jquery2.default)(tempDiv).appendTo(this._gridAdvanced.entBox);
            (0, _jquery2.default)('#gridFocusDiv').focus();
            (0, _jquery2.default)(this._gridAdvanced.entBox).parent().focus();
            (0, _jquery2.default)(this._gridAdvanced.entBox).children('#gridFocusDiv').remove();
        };

        TwGridAdvanced.prototype._triggerGridEvent = function _triggerGridEvent(eventName, parameters) {
            (0, _jquery2.default)('#' + this._gridId).trigger(eventName, parameters);
        };

        TwGridAdvanced.prototype._resetColumnSort = function _resetColumnSort() {
            this._columnSortHandler = new _columnSortHandler.ColumnSortHandler(this._gridAdvanced, this._cfg, this._userSettingHandler, this._formatRowsInView.bind(this));
            this._columnSortHandler.setColumnSort();
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
            var visibleHeight = -1;
            if (scrollTop > 0) {
                visibleHeight = this._getGridObjBoxElementHeight();
            }
            this._scrollTimeout = setTimeout(function () {
                if (scrollTop > 0 && scrollTop > visibleHeight) {
                    _this20._formatRowsInView(true);
                }
            }, 100);
        };

        TwGridAdvanced.prototype._renderCell = function _renderCell(rowId, cellIndex, editMode) {
            var columnName = this._gridAdvanced.getColumnId(cellIndex);
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef && columnDef.inLayout && columnDef.columnFormatter && columnDef.columnFormatter.cellEditor.isEnabled) {
                var gridRow = this._dhtmlxTableData.getRowById(rowId);
                var rawValue = gridRow.rawData[this._dhtmlxTableData.findColumnIndex(columnName)];
                var stateValueColumnIndex = this._findStateValueColumnIndex(this._dhtmlxTableData.allColumns, columnDef);
                var stateValue = stateValueColumnIndex > -1 ? gridRow.rawData[stateValueColumnIndex] : rawValue;
                var renderCell = columnDef.render(rawValue, stateValue, editMode);
                if (renderCell) {
                    this._markedValue = renderCell.value;
                    this._gridAdvanced.cells(rowId, cellIndex).setValue(renderCell.value);
                    var columnType = this._isTreeGrid && cellIndex === 0 ? 'tree' : renderCell.columnType;
                    this._gridAdvanced.setCellExcellType(rowId, cellIndex, columnType);
                }
            }
        };

        TwGridAdvanced.prototype._handleCellChangeEvent = function _handleCellChangeEvent(rowId, cellIndex, newValue) {
            var columnName = this._gridAdvanced.getColumnId(cellIndex);
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef && columnDef.columnFormatter) {
                if (columnDef.columnFormatter.valueConverter.type === 'datetime') {
                    if ((typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue)) === 'object') {
                        if (newValue.getTime() === new Date('December 31, 1969 19:00:00').getTime()) {
                            return;
                        } else if (this._dhtmlxTableData.cacheEditedRow(rowId, columnName, newValue) && this._calendarEvent !== 'started') {
                            this._handleUpdatedRows();
                        }
                    }

                    if (this._markedValue !== newValue) {
                        if (this._calendarEvent === 'reformat') {
                            this._calendarEvent = 'done';
                            this._renderCell(rowId, cellIndex, false);
                        } else {
                            this._calendarEvent = 'reformat';
                        }
                    }
                }
            }
        };

        TwGridAdvanced.prototype._handleCellMarkedEvent = function _handleCellMarkedEvent(rowId, cellIndex) {
            this._markedValue = undefined;
            this._calendarEvent = 'started';
            var columnName = this._gridAdvanced.getColumnId(cellIndex);
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef && columnDef.columnFormatter) {
                var editMode = true;
                if (columnDef.columnFormatter && columnDef.columnFormatter.valueConverter && columnDef.columnFormatter.valueConverter.type === 'boolean' && columnDef.columnFormatter.valueConverter.valueFormat !== 'checkbox') {
                    editMode = false;
                }
                this._renderCell(rowId, cellIndex, editMode);
                if (editMode) {
                    this._gridAdvanced.editCell();
                }
            }
        };

        TwGridAdvanced.prototype._handleCellUnmarkedEvent = function _handleCellUnmarkedEvent(rowId, cellIndex) {
            var columnName = this._gridAdvanced.getColumnId(cellIndex);
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef && columnDef.columnFormatter) {
                if (columnDef.columnFormatter.valueConverter && columnDef.columnFormatter.valueConverter.type === 'datetime') {
                    this._calendarEvent = 'done';
                }
                var editMode = false;
                if (columnDef.isCheckboxFormatter()) {
                    editMode = this._editMode && columnDef.columnFormatter.cellEditor.isEnabled;
                }
                this._renderCell(rowId, cellIndex, editMode);
            }
        };

        TwGridAdvanced.prototype._handleEditCellEvent = function _handleEditCellEvent(stage, rowId, cellIndex, newValue, oldValue) {
            var rValue = false;
            if (stage === 0 || stage === 1) {
                this._cellEditCallback(0);
                rValue = true;
            } else if (stage === 2) {
                var columnName = this._gridAdvanced.getColumnId(cellIndex);
                var columnDef = this._cfg.findColumnDefinition(columnName);
                if (columnDef && columnDef.columnFormatter) {
                    if (newValue !== undefined && newValue !== "undefined" && this._dhtmlxTableData.cacheEditedRow(rowId, columnName, newValue)) {
                        this._handleUpdatedRows();
                    }

                    var editMode = false;
                    if (columnDef.isCheckboxFormatter()) {
                        editMode = this._editMode && columnDef.columnFormatter.cellEditor.isEnabled;
                    }
                    this._renderCell(rowId, cellIndex, editMode);
                }
                rValue = true;
            }
            return rValue;
        };

        TwGridAdvanced.prototype._handleCheckBoxChanged = function _handleCheckBoxChanged(rowId, cellIndex, state) {
            var columnName = this._gridAdvanced.getColumnId(cellIndex);
            var columnDef = this._cfg.findColumnDefinition(columnName);
            if (columnDef && columnDef.columnFormatter) {
                if (columnDef.columnFormatter.valueConverter && columnDef.columnFormatter.valueConverter.type === 'boolean') {
                    if (this._dhtmlxTableData.cacheEditedRow(rowId, columnName, state)) {
                        this._handleUpdatedRows();
                    }
                }
            }
        };

        TwGridAdvanced.prototype._handleUpdatedRows = function _handleUpdatedRows() {
            var rows = this._dhtmlxTableData.updateEditedInfoTableRows();
            if (rows.length > 0) {
                this._cellEditCallback(2, rows);
            }
        };

        TwGridAdvanced.prototype._adjustHorizontalOffset = function _adjustHorizontalOffset() {
            var styleBlockId = this._gridId + '_header_offset_block';
            (0, _jquery2.default)('#' + styleBlockId).remove();
            (0, _jquery2.default)('#' + this._gridId + ' .headerTail').removeClass('headerTail');
            var horizontalScrollPresent = this._horizontalScrollBarPresent();
            if (horizontalScrollPresent && this._verticalScrollBarPresent(horizontalScrollPresent)) {
                var headerElements = (0, _jquery2.default)('#' + this._gridId + ' .xhdr tr th');

                headerElements = headerElements.filter(function (index) {
                    return headerElements.eq(index).width() !== 0;
                });
                var tailElement = (0, _jquery2.default)(headerElements.last());
                tailElement.addClass('headerTail');
                var styleRules = '';
                var idSelector = '#' + this._gridId;
                var scrollOffset = this._getScrollWidth();
                styleRules += idSelector + ' .headerTail { width: ' + (tailElement.width() + scrollOffset) + 'px !important }';
                var styleBlock = '<style id="' + styleBlockId + '">' + styleRules + '</style>';
                (0, _jquery2.default)(idSelector).prepend(styleBlock);
            }
        };

        TwGridAdvanced.prototype._horizontalScrollBarPresent = function _horizontalScrollBarPresent() {
            var scrollBars = false;
            var tableElement = (0, _jquery2.default)(this._gridAdvanced.entBox).children('.objbox').children('table');
            var parentContainer = (0, _jquery2.default)(this._gridAdvanced.entBox).closest('.widget-content .widget-gridadvanced');
            if (parentContainer && tableElement) {
                scrollBars = tableElement.width() > parentContainer.width();
            }
            return scrollBars;
        };

        TwGridAdvanced.prototype._verticalScrollBarPresent = function _verticalScrollBarPresent(horizontalScrollPresent) {
            var state = this._gridAdvanced.getStateOfView();
            var visibleHeight = this._getGridObjBoxElementHeight();
            visibleHeight = horizontalScrollPresent ? visibleHeight - 17 : visibleHeight;
            var minRowHeight = this._cfg && this._cfg.rowDefinition ? this._cfg.rowDefinition.minRowHeight : 28;
            var visibleRowCount = parseInt(visibleHeight / minRowHeight, 10);
            return state[2] > visibleRowCount;
        };

        TwGridAdvanced.prototype._showTooltip = function _showTooltip(id, index) {
            var columnId = this._gridAdvanced.getColumnId(index);
            var columnDef = this._cfg.findColumnDefinition(columnId);
            if (columnDef && columnDef.allowsTooltips) {
                var cellObj = this._gridAdvanced.cellById(id, index);
                var objBox = this._gridEntBoxElement.find('.objbox');
                var tooltipCfg = {
                    gridBoxScrollLeft: objBox.scrollLeft(),
                    gridBoxOffset: objBox.offset().left,
                    gridBoxOffsetTop: objBox.offset().top,
                    gridBoxHeight: objBox.height(),
                    gridBoxWidth: objBox.width(),
                    textAlignment: columnDef.textAlignment,
                    minRowHeight: this._cfg.rowDefinition.minRowHeight,
                    scrollWidth: this._includeScrollOffset() ? this._getScrollWidth() : 0
                };
                this._tooltip.setTooltip(this._cleanTooltipText(cellObj.getValue()), cellObj.cell, this._gridId, tooltipCfg);
            }
            return false;
        };

        TwGridAdvanced.prototype._cleanTooltipText = function _cleanTooltipText(value) {
            var chars = value.split('');
            var output = '';
            var ignore = false;
            chars.forEach(function (char, index) {
                if (char === '<') {
                    ignore = true;
                } else if (char === '>') {
                    ignore = false;
                } else if (!ignore) {
                    output += char;
                }
            });
            return output;
        };

        TwGridAdvanced.prototype._updateColumnConfigWidths = function _updateColumnConfigWidths() {
            var _this21 = this;

            var createInitWidth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var totals = {
                totalTableWidth: this._getGridBoxParentDimensions().width,
                totalAutoWidthColumns: 0,
                totalPercWidthColumns: 0,
                totalPercWidth: 0,
                totalPixWidth: 0,
                totalColumns: 0
            };

            this._columnConfigs.forEach(function (col) {
                if (col.hidden !== true) {
                    totals.totalColumns += 1;
                    if (col.width.indexOf('*') > -1) {
                        totals.totalAutoWidthColumns += 1;
                    } else if (col.width.indexOf('%') > -1) {
                        totals.totalPercWidthColumns += 1;
                        var percent = col.width.replace('%', '');
                        percent = percent && percent.length > 0 ? parseInt(percent, 10) : 0;
                        totals.totalPercWidth += percent;
                    } else if (col.width.indexOf('px') > -1) {
                        var width = col.width.replace('px', '');
                        width = width && width.length > 0 ? parseInt(width, 10) : 0;
                        totals.totalPixWidth += width;
                    }
                }
            });


            var containerWidth = this._getGridBoxParentDimensions().width;
            (0, _jquery2.default)(this._gridAdvanced.entBox).css('width', containerWidth);

            this._adjustHorizontalOffset();
            var horizontalScrollBarPresent = this._horizontalScrollBarPresent();
            var scrollBarWidth = 0;
            if (this._verticalScrollBarPresent(horizontalScrollBarPresent)) {
                scrollBarWidth += this._getScrollWidth();
            }

            var availablePercentColumnWidth = totals.totalTableWidth - totals.totalPixWidth;
            var availableAutoWidth = 0;
            var perColumnAutoWidth = 0;
            if (totals.totalPercWidth >= 100) {
                var minAutoWidth = 0;
                if (totals.totalAutoWidthColumns > 0) {
                    minAutoWidth = totals.totalAutoWidthColumns * MIN_COLUMN_AUTO_WIDTH;
                    availablePercentColumnWidth = availablePercentColumnWidth - minAutoWidth;
                    availableAutoWidth = minAutoWidth - scrollBarWidth;
                } else if (totals.totalPercWidthColumns === totals.totalColumns) {
                    availablePercentColumnWidth -= scrollBarWidth;
                }
            } else if (totals.totalPercWidth > 0) {
                availableAutoWidth = availablePercentColumnWidth - scrollBarWidth - this._precisionRound(availablePercentColumnWidth * (totals.totalPercWidth / 100), 1);
            } else {
                availableAutoWidth = availablePercentColumnWidth - scrollBarWidth;
            }
            perColumnAutoWidth = this._precisionRound(availableAutoWidth / totals.totalAutoWidthColumns, 1);
            perColumnAutoWidth = perColumnAutoWidth <= MIN_COLUMN_AUTO_WIDTH ? MIN_COLUMN_AUTO_WIDTH : perColumnAutoWidth;

            _logger.Logger.debug('updateColumnConfigWidths(): Total available width=' + totals.totalTableWidth);
            var initColumnWidth = '';
            this._columnConfigs.forEach(function (col, index) {
                var width = 0;
                if (col.hidden) {
                    width = 0;
                } else if (col.width.indexOf('*') > -1) {
                    width = perColumnAutoWidth;
                    _logger.Logger.debug('updateColumnConfigWidths(): auto-width: ' + width);
                } else if (col.width.indexOf('%') > -1) {
                    var percent = col.width.replace('%', '');
                    percent = percent && percent.length > 0 ? parseInt(percent, 10) : 0;
                    width = _this21._precisionRound(availablePercentColumnWidth * percent / 100, 1);
                    _logger.Logger.debug('updateColumnConfigWidths(): %-width: ' + width);
                } else if (col.width.indexOf('px') > -1) {
                    width = col.width.replace('px', '');
                    width = width && width.length > 0 ? parseInt(width, 10) : 0;
                    _logger.Logger.debug('updateColumnConfigWidths(): px-width: ' + width);
                }
                if (createInitWidth) {
                    initColumnWidth += index < _this21._columnConfigs.length - 1 ? width + ',' : width;
                } else if (col.hidden === false) {
                    var _index2 = _this21._gridAdvanced.getColIndexById(col.id);
                    _logger.Logger.debug('updateColumnConfigWidths(): set widths, id: ' + col.id + ' index: ' + _index2 + ' width: ' + width);
                    _this21._gridAdvanced.setColWidth(_index2, width);
                }
            });
            return initColumnWidth;
        };

        TwGridAdvanced.prototype._precisionRound = function _precisionRound(number, precision) {
            var factor = Math.pow(10, precision);
            return Math.round(number * factor) / factor;
        };

        TwGridAdvanced.prototype._storeUserGridSettings = function _storeUserGridSettings() {
            if (!this._ignoreColumnMoveEvents && this._columnConfigs.length > 0) {
                var gridWidths = [this._columnConfigs.length];
                var columnOrder = [this._columnConfigs.length];
                var columnHidden = [this._columnConfigs.length];

                for (var i = 0; i < this._columnConfigs.length; i++) {
                    var column = this._columnConfigs[i];
                    var index = this._gridAdvanced.getColIndexById(column.id);
                    _logger.Logger.debug('storeUserGridSettings(): set:' + 'id: ' + column.id + ' index: ' + index + ' width: ' + column.width);
                    gridWidths[index] = column.width;
                    columnOrder[index] = column.index;
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

        TwGridAdvanced.prototype._readUserGridSettings = function _readUserGridSettings() {
            var _this22 = this;

            this._performanceMonitor.startTime('readUserGridSettings');
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled && this._dhtmlxTableData && this._dhtmlxTableData._data.rows.length >= 0) {
                if (this._userSettingHandler.hasUserSetting('gridSettings')) {
                    try {
                        var gridSetting = this._userSettingHandler.readSetting('gridSettings');
                        this._columnConfigs = [];
                        gridSetting.columnOrder.forEach(function (columnIndex, index) {
                            var width = gridSetting.columnWidths[index];
                            var hidden = gridSetting.columnVisibility[index] === '1';
                            var id = _this22._dhtmlxTableData.columns[columnIndex];

                            _this22._columnConfigs[index] = { id: id, index: columnIndex, width: width, hidden: hidden };
                            _logger.Logger.debug('readUserGridSettings(): Read: ' + 'id: ' + _this22._columnConfigs[index].id + ' index: ' + _this22._columnConfigs[index].index + ' width: ' + _this22._columnConfigs[index].width + ' hidden: ' + _this22._columnConfigs[index].hidden);
                        });
                        this._orderColumns(gridSetting);
                    } catch (ex) {
                        _logger.Logger.error('Failed loading grid configuration from cookie. Resetting user settings and loading with default configuration: ' + ex.message);
                        this._resetGrid(false);
                    }
                }

                if (this._isTreeGrid && this._userSettingHandler.hasUserSetting('gridOpen')) {
                    try {
                        this._gridAdvanced.loadOpenStates(this._userSettingHandler.userCookie);
                    } catch (ex) {
                        _logger.Logger.error('Failed loading tree-grid configuration from cookie. Resetting user settings and loading' + ' with default configuration');
                        this._resetGrid(false);
                    }
                }
            }
            this._updateColumnConfigWidths();
            this._updateColumnVisibility();
            this._performanceMonitor.endTime('readUserGridSettings');
        };

        TwGridAdvanced.prototype._enableColumnSettingPersistence = function _enableColumnSettingPersistence() {
            this._performanceMonitor.startTime('enableColumnSettingPersistence');
            if (this._userSettingHandler && this._userSettingHandler.cookiePersistenceEnabled) {
                this._gridAdvanced.enableResizing(this._getColumnResizeList(), 'expires=' + this._expirationDate.toUTCString());
            }
            if (this._cfg.enableContextMenu) {
                this._gridAdvanced.enableHeaderMenu();
            }
            this._performanceMonitor.endTime('enableColumnSettingPersistence');
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
            var _this23 = this;

            if (rowIds) {
                var childGridHandler = this._createChildGridHandler();
                rowIds = rowIds.split(',');
                rowIds.forEach(function (id) {
                    if (_this23._cfg.includeRowExpansionParents) {
                        childGridHandler.expandPath(id, isRowSelection);
                    } else {
                        if (isRowSelection) {
                            id = _this23._gridAdvanced.getParentId(id);
                        }
                        _this23._gridAdvanced.openItem(id);
                    }
                });
            }
        };

        TwGridAdvanced.prototype._resetSearch = function _resetSearch() {
            if (this._cfg.searchSettings.enabled) {
                var searchElem = (0, _jquery2.default)('#' + this._gridId + '-search-container .dhxtoolbar_input');
                searchElem.val(this._searchValue);

                setTimeout(function () {
                    searchElem.focus();
                }, 50);
            }
        };

        TwGridAdvanced.prototype._queryData = function _queryData() {
            if (this._dhtmlxTableData) {
                this._dhtmlxTableData.cacheTimestamp = new Date().getTime();
            }
            var query = this._getQueryData();
            var params = [query.query];
            this._triggerGridEvent('queryGridColumns', params);
        };

        TwGridAdvanced.prototype._getQueryData = function _getQueryData() {
            this._queryHandler = new _queryHandler.QueryHandler(this._cfg);
            return this._queryHandler.createFilterQuery(this._escapeSpecialJSONChars(this._searchValue), this._columnSortHandler._sortColumns, this._updatedQueryFilter);
        };

        TwGridAdvanced.prototype._escapeSpecialJSONChars = function _escapeSpecialJSONChars(searchValue) {
            searchValue = searchValue.replace(/{/g, '\\{');
            searchValue = searchValue.replace(/}/g, '\\}');
            searchValue = searchValue.replace(/\(/g, '\\(');
            searchValue = searchValue.replace(/\)/g, '\\)');
            searchValue = searchValue.replace(/\[/g, '\\[');
            searchValue = searchValue.replace(/\]/g, '\\]');
            return searchValue;
        };

        _createClass(TwGridAdvanced, [{
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
            key: 'cellEditCallback',
            set: function set(callback) {
                this._cellEditCallback = callback;
            }
        }, {
            key: 'gridEditCallback',
            set: function set(callback) {
                this._gridEditCallback = callback;
            }
        }, {
            key: 'childDataServiceInvoker',
            set: function set(childDataServiceInvoker) {
                this._childDataServiceInvoker = childDataServiceInvoker;
            }
        }, {
            key: 'childDataServiceParameters',
            set: function set(childDataServiceParameters) {
                this._childDataServiceParameters = childDataServiceParameters;
            },
            get: function get() {
                if (this._childDataServiceParameters === undefined) {
                    this._childDataServiceParameters = function () {
                        return {};
                    };
                }
                return this._childDataServiceParameters;
            }
        }, {
            key: 'enableFilterEventOnConfigChange',
            set: function set(enabled) {
                this._enableFilterEventOnConfigChange = enabled;
            }
        }, {
            key: 'l8nTokens',
            set: function set(tokens) {
                this._l8nTokens = tokens;
            }
        }]);

        return TwGridAdvanced;
    }()) || _class) || _class);
});
//# sourceMappingURL=../maps/grid-advanced/tw-grid-advanced.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/user-setting-handler',['exports', 'lodash-amd', './logger'], function (exports, _lodashAmd, _logger) {
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
            this._columnSortConfigCookie = 'sortGridColumns_' + this._userCookie;
            this._gridOpenConfigCookie = 'gridOpen' + this._userCookie;
            this._expirationDate = new Date();
            this._expirationDate.setFullYear(this._expirationDate.getFullYear() + 1);
        }

        UserSettingHandler.prototype.hasUserSetting = function hasUserSetting(userSetting) {
            var hasUserSetting = false;
            var cookies = this.getCookies();
            switch (userSetting) {
                case 'gridSettings':
                    hasUserSetting = this._cookiePersistenceEnabled ? cookies.indexOf(this._gridConfigCookie) > -1 : false;
                    break;
                case 'sortGridColumns':
                    hasUserSetting = this._cookiePersistenceEnabled ? cookies.indexOf(this._columnSortConfigCookie) > -1 : false;
                    break;
                case 'gridOpen':
                    hasUserSetting = this._cookiePersistenceEnabled ? cookies.indexOf(this._gridOpenConfigCookie) > -1 : false;
                    break;
                default:
                    hasUserSetting = false;
            }
            return hasUserSetting;
        };

        UserSettingHandler.prototype.getCookies = function getCookies() {
            return document.cookie;
        };

        UserSettingHandler.prototype.setCookie = function setCookie(cookie) {
            document.cookie = cookie + '; expires=' + this._expirationDate.toUTCString();
        };

        UserSettingHandler.prototype.clearCookie = function clearCookie(key) {
            document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        };

        UserSettingHandler.prototype.setUserSetting = function setUserSetting(settingName, value) {
            switch (settingName) {
                case 'gridSettings':
                    if (this._cookiePersistenceEnabled) {
                        this.setCookie(this._gridConfigCookie + '=' + this._createCookieValue(value));
                        _logger.Logger.debug("UserSettingHandler.setUserSetting(): " + this._createCookieValue(value));
                    }
                    this._gridConfigValue = value;
                    break;
                case 'gridOpen':
                    this._gridOpenConfigValue = value;
                    break;
                case 'sortGridColumns':
                    if (this._cookiePersistenceEnabled) {
                        this.setCookie(this._columnSortConfigCookie + '=' + value);
                    }
                    this._columnSortConfigValue = value;
                    break;
                default:
            }
        };

        UserSettingHandler.prototype.resetUserSetting = function resetUserSetting(settingName) {
            switch (settingName) {
                case 'gridSettings':
                    if (this._cookiePersistenceEnabled) {
                        this.clearCookie(this._gridConfigCookie);
                    } else {
                        this._gridConfigValue = undefined;
                    }
                    break;
                case 'gridOpen':
                    if (this._cookiePersistenceEnabled) {
                        this.clearCookie(this._gridOpenConfigCookie);
                    } else {
                        this._gridOpenConfigValue = undefined;
                    }
                    break;
                case 'sortGridColumns':
                    if (this._cookiePersistenceEnabled) {
                        this.clearCookie(this._columnSortConfigCookie);
                    } else {
                        this._columnSortConfigValue = undefined;
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
                    columnWidths: settings[0] ? settings[0].split('-') : [],
                    columnOrder: settings[3] ? settings[3].split('-') : [],
                    columnVisibility: settings[4] ? settings[4].split('-') : []
                };
            }
            return cookieConfig;
        };

        UserSettingHandler.prototype._createCookieValue = function _createCookieValue(gridSettings) {
            var cookie = '';

            gridSettings.columnWidths.forEach(function (v, index) {
                cookie += v;
                cookie += index < gridSettings.columnWidths.length - 1 ? '-' : '';
            });
            cookie += '|||';

            gridSettings.columnOrder.forEach(function (v, index) {
                cookie += v;
                cookie += index < gridSettings.columnOrder.length - 1 ? '-' : '';
            });
            cookie += '|';
            gridSettings.columnVisibility.forEach(function (v, index) {
                cookie += v !== undefined && v === true ? '1' : '';
                cookie += index < gridSettings.columnVisibility.length - 1 ? '-' : '';
            });
            cookie += '|';
            return cookie;
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
//# sourceMappingURL=../maps/grid-advanced/user-setting-handler.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/events/register-event',['exports', '../logger'], function (exports, _logger) {
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
//# sourceMappingURL=../../maps/grid-advanced/events/register-event.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/tooltip/default-tooltip',['exports', 'jquery'], function (exports, _jquery) {
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
//# sourceMappingURL=../../maps/grid-advanced/tooltip/default-tooltip.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/tooltip/mashup-builder-tooltip',['exports', 'jquery'], function (exports, _jquery) {
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

    var CHAR_WIDTH = 5.2;
    var TOOLTIP_HEIGHT = 35;
    var MashupBuilderTooltip = exports.MashupBuilderTooltip = function () {
        function MashupBuilderTooltip() {
            _classCallCheck(this, MashupBuilderTooltip);
        }

        MashupBuilderTooltip.setTooltip = function setTooltip(tooltip, element, widgetId, cfg) {
            var alignment = cfg.textAlignment !== undefined ? cfg.textAlignment : 'left';
            var rowHeight = cfg.minRowHeight !== undefined ? cfg.minRowHeight : 30;
            var scrollOffset = cfg.scrollWidth + 2;

            var $element = (0, _jquery2.default)(element);
            var $tiptipHolder = void 0;
            var $tiptipContent = void 0;
            var offsetLeft = $element.offset().left;
            var offsetWidth = $element.width();
            var offsetTop = $element.offset().top;
            if (tooltip !== undefined && tooltip.length > 0 && $element.tipTip !== undefined) {
                if ($element.data('tiptip') === true && ($element.data('offsetWidth') !== offsetWidth || $element.data('offsetLeft') !== offsetLeft || $element.data('offsetTop') !== offsetTop)) {
                    $element.data('tiptip', false);
                }
                if ($element.data('tiptip') !== true) {
                    $element.tipTip({
                        maxWidth: 'auto',
                        edgeOffset: -5,
                        content: tooltip,
                        enter: function enter() {
                            setTimeout(function () {
                                $tiptipHolder = (0, _jquery2.default)('#tiptip_holder');
                                $tiptipHolder.addClass(widgetId);
                                var margin = void 0;
                                var dataOffsetTop = $element.data('offsetTop');
                                var tooltipWidth = tooltip.length * CHAR_WIDTH;

                                var dataOffsetLeft = $element.data('offsetLeft');
                                var dataOffsetWidth = $element.data('offsetWidth');
                                var gridBoxOffsetRight = cfg.gridBoxOffset + cfg.gridBoxWidth + cfg.scrollWidth;

                                var topMargin = void 0;
                                if (dataOffsetTop + rowHeight > cfg.gridBoxOffsetTop + cfg.gridBoxHeight) {
                                    topMargin = cfg.gridBoxOffsetTop + cfg.gridBoxHeight - 5;
                                } else {
                                    topMargin = dataOffsetTop + rowHeight - 5;
                                }

                                var element = $element[0];
                                var doc = element.ownerDocument;
                                var win = doc.defaultView || doc.parentWindow;
                                if (topMargin + TOOLTIP_HEIGHT > win.innerHeight) {
                                    topMargin = dataOffsetTop - TOOLTIP_HEIGHT;
                                }

                                if (dataOffsetLeft < cfg.gridBoxOffset) {
                                    var offset = cfg.gridBoxOffset + (dataOffsetLeft + dataOffsetWidth - cfg.gridBoxOffset) / 2 - tooltipWidth / 2;
                                    margin = topMargin + 'px 0px 0px ' + offset + 'px';
                                } else if (dataOffsetLeft + dataOffsetWidth > gridBoxOffsetRight) {
                                    if (alignment === 'left') {
                                        var _offset = dataOffsetLeft;
                                        if (tooltipWidth > dataOffsetWidth) {
                                            _offset = dataOffsetLeft + dataOffsetWidth / 2 - tooltipWidth / 2;
                                        }
                                        margin = topMargin + 'px 0px 0px ' + _offset + 'px';
                                    } else {
                                        var _offset2 = dataOffsetLeft + (gridBoxOffsetRight - dataOffsetLeft) / 2 - tooltipWidth / 2;
                                        margin = topMargin + 'px 0px 0px ' + _offset2 + 'px';
                                    }
                                } else if (alignment !== 'center') {
                                    if (alignment === 'left') {
                                        var _offset3 = dataOffsetLeft;
                                        if (tooltipWidth > dataOffsetWidth) {
                                            _offset3 = dataOffsetLeft + dataOffsetWidth / 2 - tooltipWidth / 2;
                                        }
                                        margin = topMargin + 'px 0px 0px ' + _offset3 + 'px';
                                    } else if (alignment === 'right' && tooltipWidth < dataOffsetWidth || tooltip.length === 0) {
                                        var _offset4 = dataOffsetLeft + dataOffsetWidth - scrollOffset - tooltipWidth;
                                        margin = topMargin + 'px 0px 0px ' + _offset4 + 'px';
                                    }
                                } else {
                                    var _offset5 = dataOffsetLeft + dataOffsetWidth / 2 - tooltipWidth / 2;
                                    margin = topMargin + 'px 0px 0px ' + _offset5 + 'px';
                                }
                                if (margin !== undefined && topMargin !== undefined) {
                                    $tiptipHolder.css({ margin: '' });

                                    $tiptipHolder.css({ margin: margin });
                                }
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
                    $element.data('offsetWidth', offsetWidth);
                    $element.data('offsetLeft', offsetLeft);
                    $element.data('offsetTop', offsetTop);
                    $element.trigger('mouseenter');
                }
            }
        };

        return MashupBuilderTooltip;
    }();
});
//# sourceMappingURL=../../maps/grid-advanced/tooltip/mashup-builder-tooltip.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/tooltip/thingworx-tooltip',["exports"], function (exports) {
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
//# sourceMappingURL=../../maps/grid-advanced/tooltip/thingworx-tooltip.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/tooltip/tooltip-factory',['exports', './default-tooltip', './thingworx-tooltip', './mashup-builder-tooltip'], function (exports, _defaultTooltip, _thingworxTooltip, _mashupBuilderTooltip) {
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
//# sourceMappingURL=../../maps/grid-advanced/tooltip/tooltip-factory.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/boolean-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
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

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'boolean', valueFormat, params));
        }

        BooleanRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            if (editMode === false) {
                switch (this._valueFormat) {
                    case 'text':
                        value = imageLink ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + _DefaultRenderer.prototype.toView.call(this, value) : _DefaultRenderer.prototype.toView.call(this, value);
                        break;
                    case 'notext':
                        value = imageLink ? '<img style="vertical-align:top" src="' + imageLink + '">' : '';
                        break;
                    case 'checkbox':
                    default:
                        value = '<input type="CHECKBOX" ' + (value === true ? 'checked' : '') + ' disabled="disabled">';
                }
            }
            return value;
        };

        BooleanRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            if (typeof rawValue === 'boolean') {
                if (typeof newValue === 'boolean') {
                    return newValue;
                } else if (typeof newValue === 'string') {
                    return newValue === 'true';
                }
            } else if (typeof rawValue === 'number') {
                if (typeof newValue === 'boolean') {
                    return newValue === true ? 1 : 0;
                } else if (typeof newValue === 'string') {
                    return newValue === 'true' ? 1 : 0;
                }
            } else if (typeof rawValue === 'string') {
                if (typeof newValue === 'boolean') {
                    return newValue === true ? 'true' : 'false';
                } else if (typeof newValue === 'string') {
                    return newValue === 'true' ? 'true' : 'false';
                }
            }
            return newValue;
        };

        return BooleanRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/boolean-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/datetime-renderer',['exports', './default-renderer', 'moment-jdateformatparser', 'lodash-amd'], function (exports, _defaultRenderer, _momentJdateformatparser, _lodashAmd) {
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

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'datetime', valueFormat, params));
        }

        DatetimeRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            if (editMode === false) {
                if (_lodashAmd2.default.isNil(value)) {
                    value = '---';
                } else if (_lodashAmd2.default.isString(value)) {
                    value = value.trim().length === 0 ? '---' : (0, _momentJdateformatparser2.default)(new Date(value)).format(this._valueFormat);
                } else {
                    value = this._formatDate(value, this._valueFormat);
                }
                if (imageLink) {
                    value = '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value;
                }
            }

            return value;
        };

        DatetimeRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            if (newValue === undefined || newValue === '') {
                return undefined;
            } else {
                return _lodashAmd2.default.isDate(newValue) ? newValue.getTime() : new Date(newValue).getTime();
            }
        };

        DatetimeRenderer.prototype._formatDate = function _formatDate(value, format) {
            var m = (0, _momentJdateformatparser2.default)(value);
            var date = void 0;

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
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/datetime-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/default-renderer',['exports', 'htmlencode', 'lodash-amd'], function (exports, _htmlencode, _lodashAmd) {
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

    var DefaultRenderer = exports.DefaultRenderer = function () {
        function DefaultRenderer(type, valueFormat, params) {
            var encodeValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
            var allowTooltip = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;

            _classCallCheck(this, DefaultRenderer);

            this._type = type;
            this._valueFormat = valueFormat;
            this._params = params;
            this._encodeValue = encodeValue;
            this._allowTooltip = allowTooltip;
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

        DefaultRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            if (typeof newValue === 'string') {
                return newValue;
            } else {
                return newValue.toString();
            }
        };

        _createClass(DefaultRenderer, [{
            key: 'type',
            get: function get() {
                return this._type;
            }
        }, {
            key: 'params',
            get: function get() {
                return this._params;
            }
        }, {
            key: 'valueFormat',
            get: function get() {
                return this._valueFormat;
            }
        }, {
            key: 'allowTooltip',
            get: function get() {
                return this._allowTooltip;
            }
        }]);

        return DefaultRenderer;
    }();
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/default-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/html-renderer',['exports', 'html-css-sanitizer', './default-renderer', 'htmlencode'], function (exports, _htmlCssSanitizer, _defaultRenderer, _htmlencode) {
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

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'html', valueFormat, params, valueFormat === 'raw'));
        }

        HtmlRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var valString = _DefaultRenderer.prototype.toView.call(this, value);
            if (editMode === false) {
                switch (this._valueFormat) {
                    case 'raw':
                        break;
                    case 'unsanitized':
                        break;
                    case 'format':
                    default:
                        valString = HtmlRenderer.sanitize(valString);
                }
            } else {
                valString = HtmlRenderer.sanitize(valString);
            }
            return valString;
        };

        HtmlRenderer.sanitize = function sanitize(html) {
            return _htmlCssSanitizer2.default.sanitize(html, function (u) {
                return u;
            }, function (id) {
                return id;
            });
        };

        return HtmlRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/html-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/hyperlink-renderer',['exports', 'html-css-sanitizer', './default-renderer'], function (exports, _htmlCssSanitizer, _defaultRenderer) {
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

            var _this = _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'hyperlink', valueFormat, params));

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
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var view = '';
            if (value) {
                var encodedValue = _DefaultRenderer.prototype.toView.call(this, this._sanitize(value));
                if (editMode === false) {
                    view = '<a target="' + this._valueFormat + '" href="' + encodedValue + '">' + this._params.textFormat + '</a>';
                } else {
                    view = encodedValue;
                }
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
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/hyperlink-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/imagelink-renderer',['exports', 'html-css-sanitizer', './default-renderer'], function (exports, _htmlCssSanitizer, _defaultRenderer) {
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

            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'imagelink', valueFormat, params, true, valueFormat === 'hyperlink'));
        }

        ImagelinkRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            value = _DefaultRenderer.prototype.toView.call(this, value);
            if (editMode === false) {
                var safeImageLink = this._convertImageLink(value);
                switch (this._valueFormat) {
                    case 'hyperlink':
                        value = this._convertToHyperlink(value);
                        break;
                    case 'scaledtowidth':
                        value = '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:100% auto;height:100%;width:100%;background-position-y:50%;display:table;' + this._getHorizontalTextAlignment() + '" ></div>';
                        break;
                    case 'scaledtoheight':
                        value = '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:auto 100%;height:100%;width:100%;background-position-y:50%;display:table;' + this._getHorizontalTextAlignment() + '" ></div>';
                        break;
                    case 'image':
                    default:
                        value = '<div style="background-image:url(\'' + safeImageLink + '\');background-repeat:no-repeat;\n                        background-size:auto;height:100%;width:100%;background-position-y:50%;display:table;' + this._getHorizontalTextAlignment() + '" ></div>';
                        break;
                }
            }
            return value;
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

        ImagelinkRenderer.prototype._getHorizontalTextAlignment = function _getHorizontalTextAlignment() {
            var textAlignment = '';
            if (this.params && this.params.textAlignment) {
                var position = '0%;';
                if (this.params.textAlignment === 'center') {
                    position = '50%;';
                } else if (this.params.textAlignment === 'right') {
                    position = '100%;';
                }
                textAlignment = "background-position-x:" + position;
            }
            return textAlignment;
        };

        return ImagelinkRenderer;
    }(_defaultRenderer.DefaultRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/imagelink-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/integer-renderer',['exports', './number-renderer'], function (exports, _numberRenderer) {
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
            return _possibleConstructorReturn(this, _NumberRenderer.call(this, 'integer', valueFormat, params));
        }

        IntegerRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            return _NumberRenderer.prototype.toView.call(this, value, editMode, imageLink);
        };

        IntegerRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            var parsed = newValue;
            if (typeof newValue === 'string' && newValue !== '') {
                parsed = parseInt(newValue, 10);
            } else if (typeof newValue === 'number') {
                parsed = parseInt(newValue.toString(), 10);
            }
            parsed = isNaN(parsed) ? rawValue : parsed;
            return parsed;
        };

        return IntegerRenderer;
    }(_numberRenderer.NumberRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/integer-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/location-renderer',['exports', './number-renderer'], function (exports, _numberRenderer) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.LocationRenderer = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

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

    var LocationRenderer = exports.LocationRenderer = function (_NumberRenderer) {
        _inherits(LocationRenderer, _NumberRenderer);

        function LocationRenderer(valueFormat, params) {
            _classCallCheck(this, LocationRenderer);

            valueFormat = valueFormat && valueFormat.length > 0 && /^[0]{1}\.[0]{0,6}$/.test(valueFormat) ? valueFormat : undefined;
            return _possibleConstructorReturn(this, _NumberRenderer.call(this, 'location', valueFormat, params));
        }

        LocationRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            if (editMode === false) {
                if (value) {
                    if (this._valueFormat) {
                        var latLng = value.latitude !== undefined ? _NumberRenderer.prototype._format.call(this, value.latitude, this._valueFormat) : 0;
                        latLng += value.longitude !== undefined ? ' : ' + _NumberRenderer.prototype._format.call(this, value.longitude, this._valueFormat) : ' : ' + 0;
                        latLng += value.elevation !== undefined && value.elevation !== 0 ? ' : ' + _NumberRenderer.prototype._format.call(this, value.elevation, this._valueFormat) : '';
                        value = latLng;
                    } else {
                        var _latLng = value.latitude !== undefined ? value.latitude : 0;
                        _latLng += value.longitude !== undefined ? ' : ' + value.longitude : ' : ' + 0;
                        _latLng += value.elevation !== undefined && value.elevation !== 0 ? ' : ' + value.elevation : '';
                        value = _latLng;
                    }
                }
                if (imageLink) {
                    value = value ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value : '<img style="vertical-align:top" src="' + imageLink + '">';
                }
            } else {
                var _latLng2 = value.latitude !== undefined ? value.latitude : 0;
                _latLng2 += value.longitude !== undefined ? ' : ' + value.longitude : ' : ' + 0;
                _latLng2 += value.elevation !== undefined && value.elevation !== 0 ? ' : ' + value.elevation : '';
                value = _latLng2;
            }
            return value;
        };

        LocationRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            var latLng = {
                latitude: 0,
                longitude: 0,
                elevation: 0
            };
            if ((typeof rawValue === 'undefined' ? 'undefined' : _typeof(rawValue)) === 'object' && typeof newValue === 'string') {
                if (newValue.indexOf(':') > -1) {
                    var v = newValue.split(':');
                    var v0 = v.length > 0 ? parseFloat(v[0].trim()) : 0;
                    var v1 = v.length > 1 ? parseFloat(v[1].trim()) : 0;
                    var v2 = v.length > 2 ? parseFloat(v[2].trim()) : 0;

                    if (!isNaN(v0) && !isNaN(v1)) {
                        latLng.latitude = v0;
                        latLng.longitude = v1;
                        if (rawValue.elevation !== undefined && !isNaN(v2) || rawValue.elevation === undefined && !isNaN(v2)) {
                            latLng.elevation = v2;
                        }
                        newValue = latLng;
                    } else {
                        newValue = rawValue;
                    }
                } else {
                    newValue = rawValue;
                }
            }
            return newValue;
        };

        return LocationRenderer;
    }(_numberRenderer.NumberRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/location-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/long-renderer',['exports', './number-renderer'], function (exports, _numberRenderer) {
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
            return _possibleConstructorReturn(this, _NumberRenderer.call(this, 'long', valueFormat, params));
        }

        LongRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            return _NumberRenderer.prototype.toView.call(this, value, editMode, imageLink);
        };

        return LongRenderer;
    }(_numberRenderer.NumberRenderer);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/long-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/number-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
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

        function NumberRenderer(type, valueFormat, params) {
            _classCallCheck(this, NumberRenderer);

            if (valueFormat !== undefined && valueFormat.length === 0) {
                valueFormat = '0';
            }
            if (params === undefined) {
                params = {};
            }
            if (params.roundingEnabled === undefined) {
                params['roundingEnabled'] = true;
            }
            return _possibleConstructorReturn(this, _DefaultRenderer.call(this, type, valueFormat, params));
        }

        NumberRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            value = parseFloat(value);
            if (editMode === false) {
                value = this._format(value, this._valueFormat);
                if (imageLink) {
                    value = value ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value : '<img style="vertical-align:top" src="' + imageLink + '">';
                }
            }
            return value;
        };

        NumberRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            var parsed = newValue;
            if (typeof newValue === 'string' && newValue !== '') {
                parsed = parseFloat(newValue);
            } else if (typeof newValue === 'number') {
                parsed = parseFloat(newValue.toString());
            }
            parsed = isNaN(parsed) ? rawValue : parsed;
            return parsed;
        };

        NumberRenderer.prototype._format = function _format(value, format) {
            if (typeof format !== 'string' || value === undefined) {
                return '';
            }

            var hasComma = -1 < format.indexOf(','),
                psplit = format.replace(/[^0-9.]/g, '').split('.');

            var wasNegative = false;
            if (value < 0) {
                wasNegative = true;
                value = -value;
            }
            var index = value.toString().indexOf('.');

            if (1 < psplit.length) {
                if (this.params && this.params.roundingEnabled) {
                    value = value.toFixed(psplit[1].length);
                } else if (index > -1) {
                    var decimals = value.toString().substring(index + 1, index + 1 + psplit[1].length);
                    value = parseFloat(value.toString().substring(0, index) + '.' + decimals);
                }
            } else if (2 < psplit.length) {
                throw 'NumberFormatException: invalid format, formats should have no more than 1 period: ' + format;
            } else {
                if (this.params && this.params.roundingEnabled) {
                    value = value.toFixed(0);
                } else if (index > 0) {
                    value = parseInt(value.toString().substring(0, index), 10);
                }
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
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/number-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/renderers/string-renderer',['exports', './default-renderer'], function (exports, _defaultRenderer) {
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

        function StringRenderer(valueFormat, params) {
            _classCallCheck(this, StringRenderer);

            var _this = _possibleConstructorReturn(this, _DefaultRenderer.call(this, 'string', valueFormat, params));

            _this._maxLength = _this._limitLength();
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

        StringRenderer.prototype.toView = function toView(value) {
            var editMode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var imageLink = arguments[2];

            value = _DefaultRenderer.prototype.toView.call(this, value);
            if (editMode === false) {
                var truncateLength = this._maxLength;
                if (value && value.length > truncateLength) {
                    value = value.substring(0, truncateLength);
                    value += truncateLength > 0 ? '...' : '';
                }
                if (imageLink && typeof value === 'string') {
                    value = value ? '<img style="vertical-align:top" src="' + imageLink + '">&nbsp' + value : '<img style="vertical-align:top" src="' + imageLink + '">';
                }
            }
            return value;
        };

        StringRenderer.prototype.parseValue = function parseValue(rawValue, newValue) {
            var parsed = void 0;
            if (newValue === 'string') {
                parsed = newValue;
            } else {
                parsed = newValue.toString();
            }
            return parsed;
        };

        return StringRenderer;
    }(_defaultRenderer.DefaultRenderer), _class.DEFAULT_MAX_STRING_LENGTH = 40, _temp);
});
//# sourceMappingURL=../../../maps/grid-advanced/components/renderers/string-renderer.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/definitions/state-definition',['exports', 'lodash-amd'], function (exports, _lodashAmd) {
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

        StateDefinition.prototype.findStateByValue = function findStateByValue(value) {
            var _this = this;

            var foundState = _lodashAmd2.default.find(this._states, function (state) {
                var stateValue = state.value;
                if (_this._type === 'numeric') {
                    stateValue = parseFloat(stateValue);
                } else if (typeof value === 'boolean' && stateValue === 'true') {
                    stateValue = true;
                } else if (typeof value === 'boolean' && stateValue === 'false') {
                    stateValue = false;
                }
                switch (state.comparator) {
                    case '==':
                        return value === stateValue;
                    case '!=':
                        return value !== stateValue;
                    case '>':
                        return value > stateValue;
                    case '<':
                        return value < stateValue;
                    case '>=':
                        return value >= stateValue;
                    case '<=':
                        return value <= stateValue;
                    default:
                        return false;
                }
            });
            if (!foundState) {
                foundState = _lodashAmd2.default.find(this._states, function (state) {
                    return state.comparator === undefined;
                });
            }
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
//# sourceMappingURL=../../../maps/grid-advanced/components/definitions/state-definition.js.map

gaRequire.define('tw-grid-advanced/grid-advanced/components/definitions/style-definition',['exports'], function (exports) {
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

        StyleDefinition.prototype.getBackgroundStyle = function getBackgroundStyle() {
            var important = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

        StyleDefinition.prototype.getBorderStyle = function getBorderStyle() {
            var important = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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

        StyleDefinition.prototype.getBorderWidth = function getBorderWidth() {
            return this.borderWidth.length !== 0 && !isNaN(parseInt(this.borderWidth, 10)) ? parseInt(this.borderWidth, 10) : 0;
        };

        StyleDefinition.prototype.getFontStyle = function getFontStyle() {
            var important = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

            var style = '';
            var importantStyle = important ? '!important' : '';
            if (this.color && this.color.length > 0) {
                style += ' color : ' + this.color + '' + importantStyle + '; ';
            }

            if (this.fontWeight && this.fontWeight.length > 0) {
                style += ' font-weight: ' + this.fontWeight + '' + importantStyle + ';';
            } else {
                style += ' font-weight: normal' + importantStyle + ';';
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
//# sourceMappingURL=../../../maps/grid-advanced/components/definitions/style-definition.js.map


gaRequire.define("tw-grid-advanced/grid-advanced/components/definitions/footer-definition", [],function(){});

gaRequire.define("tw-grid-advanced/grid-advanced/components/definitions/footer-definition", [],function(){});
