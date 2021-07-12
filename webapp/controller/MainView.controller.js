sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"    
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
     * @param {typeof sap.ui.core.mvc.Filter} Filter
     * @param {typeof sap.ui.core.mvc.FilterOperator} FilterOperator
	 */
	function (Controller, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("proyecto01.proyecto01.controller.MainView", {

			onInit: function () {
                const oJSONModel = new sap.ui.model.json.JSONModel();
                const oView = this.getView();
                oJSONModel.loadData("./model/SelectionScreenMenu.json");
                oView.setModel(oJSONModel, "selectionScreen");
            },
            onFilter: function (oEvent){
            const oData = this.getView().getModel("selectionScreen").getData();
            let filters = [];

            if(oData.ShipName !== "") {
                filters.push(new Filter("ShipName", FilterOperator.Contains, oData.ShipName));
            }

            if(oData.CountryKey !== "") {
                filters.push(new Filter("Country", FilterOperator.EQ, oData.CountryKey));
            }

            const oList = this.getView().byId("invoicesList");
            const oBindig = oList.getBinding("items");
            oBindig.filter(filters);

            },

            onClearFilter: function () {
                const oModelSelScreen = this.getView().getModel("selectionScreen");
                oModelSelScreen.setProperty("/ShipName", "");
                oModelSelScreen.setProperty("/CountryKey", "");

            const oList = this.getView().byId("invoicesList");
            const oBindig = oList.getBinding("items");
            oBindig.filter([]);

            }
		});
	});
