# Grid and Tree Advanced widgets

This repository is a fork of the Grid Advanced widget from the 3.0.1 version

## New features
 * Row filtering options. You can now chose the "EnableFiltering" option and enable filtering globally for all the grid. Text based filtering in the grid is done using wildcards.
 Inside the grid column configuration you can also specify the type of filtering for each row.
 * Additional properties to get the total number of rows in the grid. Properties is `NumberOfRows`.
 * Additional option to display a text in the cells where the row is undefiend. The property is `EmptyCellText`.
 * The css styles for the grid are not marked as `!important` so they can be overwritten.
 * Sorting can be done client-side. The relevant property is `ClientSideSorting`.
 * Block selection can be done in the grid by enabling the `EnableBlockSelection` property. This allows the user to copy values out of the grid, and export it as csv.
 * Enable display of unsanitized HTML in the column formatter.
 * Enable display of a footer with the total row count: `ShowTotalRowCount`.

## Fixes
* The grid is much more stable on reload. The cookie settings are not being lost as easily.
* When the grid is loaded, make sure it fills all the available space, even when it's configured to have hidden columns.
* When the grid receives no data, don't draw the column that are hidden.

## Known issues
* The combobox and search fitler are untested.
* The select filter is known to not work then the display order of the columns is different from the order of the columns in the datashape.

## Screenshots
![Example screenshot with tooltips](https://i.imgur.com/J1Dr3SD.png)
![Example screneshot](https://i.imgur.com/Kns6YWo.png)