class App {

    constructor() {


        // STATE we watch

        this.allCars = JSON.parse(localStorage.getItem('cars')) || [];

        this.filteredCars = [];

        // Add Page States
        this.selectedBrand = "";
        this.dateInput = "";
        this.transformedDateInput = "";
        this.isDateValid = false;
        this.isFormValid = false;
        // this.isDataEnteredIntoAddCarsFieldValid = false;

        // Search Page States
        this.searchedBrand = "";
        this.searchedName = "";
        this.searchedAmount = "";
        this.searchedDate = "";
        this.clickedId = "";

        // Sort States
        this.sortCriteria = "";
        this.sortOrder = false;

















        // NAV
        // nav add button
        this.$buttonNavAdd = document.querySelector("#li-add");
        // nav see button
        this.$buttonNavSee = document.querySelector("#li-see");
        // nav search button
        this.$buttonNavSearch = document.querySelector("#li-search");


        // ADD PAGE


        this.$divAdd = document.querySelector("#div-add");


        this.$divAddSelectBrand = document.querySelector("#div-add-select-brand");
        this.$divAddDateInput = document.querySelector("#div-add-date-input");
        this.$divAddTextareaAddCars = document.querySelector("#div-add-textarea-add-cars");
        this.$divAddCustomerButton = document.querySelector("#div-add-customer-button");
        this.$divClearFormButton = document.querySelector("#div-clear-form-button");



        // SEARCH PAGE

        this.$divSearchBrandInput = document.querySelector("#div-search-brand-input");
        this.$divSearchNameInput = document.querySelector("#div-search-name-input");
        this.$divSearchDateInput = document.querySelector("#div-search-date-input");

        this.$dataTableHeads = document.querySelectorAll(".data-table-head");

        this.$dataTable = document.querySelector("#data-table");






        //MODAL
        // modal edit
        this.$modalEdit = document.querySelector(".modal-edit");
        // modal delete
        this.$modalDelete = document.querySelector(".modal-delete");
        // modal edit save button
        this.$modalEditSaveButton = document.querySelector('#modal-edit-save-button');
        // modal edit back button
        this.$modalEditCancelButton = document.querySelector("#modal-edit-cancel-button");
        // modal delete delete button
        this.$modalDeleteButton = document.querySelector("#modal-delete-button");
        // modal delete back button
        this.$modalDeleteCancelButton = document.querySelector("#modal-delete-cancel-button");


        // modal edit input placeholders


        this.$modalEditBrandPlaceholder = document.getElementById("modal-edit-brand");
        this.$modalEditNamePlaceholder = document.getElementById("modal-edit-name");
        this.$modalEditAmountPlaceholder = document.getElementById("modal-edit-amount");
        this.$modalEditDatePlaceholder = document.getElementById("modal-edit-date");



        // SEE PAGE

        this.$divSee = document.querySelector("#div-see");

        // SEARCH PAGE

        this.$divSearch = document.querySelector("#div-search");
        this.$divSearchButton = document.querySelector("#div-search-button");
        this.$divSearchTable = document.querySelector("#div-search-table");






        // addind the click events function to the dom
        this.addEventListeners();

    }


    addEventListeners() {

        // click events
        document.body.addEventListener("click", e => {
            console.log(e.target);
            // this.handleClick(e);


            // will only run if e.target contains edit icons class
            this.handleEditIcon(e);

            // will only run if e.target contains delete icons class
            this.handleDeleteIcon(e);

        });

        // NAV CLICK EVENTS

        this.$buttonNavAdd.addEventListener("click", e => {
            this.handleClickNavAdd(e);
        });

        this.$buttonNavSee.addEventListener("click", e => {
            this.handleClickNavSee(e);
        });

        this.$buttonNavSearch.addEventListener("click", e => {
            this.handleClickNavSearch(e);

        });


        // ADD PAGE EVENTS

        // add button click
        this.$divAddCustomerButton.addEventListener("click", () => {

            //if data entered valid
            // transform data and save it
            // else alert the customer for valid data

            // change the stae according to this

            this.validateAndCreate();

        });


        this.$divClearFormButton.addEventListener("click", (e) => {
            this.clearAddCustomersForm();
        });


        // select option change 
        this.$divAddSelectBrand.addEventListener("change", e => {
            this.selectedBrand = this.$divAddSelectBrand.value;
            console.log(this.selectedBrand);
        });






        // SEE PAGE EVENTS



        // MODAL CLICK EVENTS

        // edit modal close button event
        this.$modalEditSaveButton.addEventListener('click', e => {

            this.saveModalEdit();
        });

        // edit modal back button event OK

        this.$modalEditCancelButton.addEventListener("click", e => {
            this.$modalEdit.classList.toggle("open-modal-edit");
        });


        // delete modal back button event OK
        this.$modalDeleteCancelButton.addEventListener("click", e => {
            this.closeModalDelete(e);
            console.log(e.target);
        });

        // delete modal delete button event
        this.$modalDeleteButton.addEventListener("click", e => {


            console.log("delete delete clicked")

            this.deleteCustomer();


        });






        // SEARCH PAGE EVENTS

        this.$divSearchButton.addEventListener("click", e => {
            e.preventDefault();
            this.handleClickSearchButton(e);
        });


        // event listener for each table head
        this.$dataTableHeads.forEach(item => {
            item.addEventListener("click", e => {
                console.log(e.target);
                this.sortCriteria = e.target.textContent;
                if (this.filteredCars.length > 0) {

                    this.sortData(this.filteredCars);

                } else if (this.filteredCars.length === 0) {
                    this.sortData(this.allCars);
                }
            });
        });




    }




    clearAddCustomersForm() {

        this.$divAddSelectBrand.value = "Select Brand";
        this.$divAddDateInput.value = "";
        this.$divAddTextareaAddCars.value = "";

    }


    // NAV FNs


    handleClickNavAdd(e) {
        this.$divAdd.classList.add("visible-to-user");
        this.$divSee.classList.remove("visible-to-user");
        this.$divSearch.classList.remove("visible-to-user");
        this.$divSearchTable.classList.add("invisible-to-user");
    }


    handleClickNavSee(e) {
        this.$divSee.classList.add("visible-to-user");
        this.$divAdd.classList.remove("visible-to-user");
        this.$divSearch.classList.remove("visible-to-user");
        this.$divSearchTable.classList.add("invisible-to-user");
        this.makeBrandCardAfterCalculations();

    }


    handleClickNavSearch(e) {
        this.$divSearch.classList.add("visible-to-user");
        this.$divAdd.classList.remove("visible-to-user");
        this.$divSee.classList.remove("visible-to-user");
        this.$divSearchTable.classList.remove("invisible-to-user");

        this.renderTableData();

    }



    // MODAL FNs

    // open edit modal fn
    openModalEdit() {

        console.log(this.clickedId);


        let filteredObject = this.allCars.filter(item => item.id === Number(this.clickedId));

        console.log(filteredObject);

        // document.getElementById("modal-edit-brand").value = filteredObject[0].brand;
        // document.getElementById("modal-edit-name").value = filteredObject[0].name;
        // document.getElementById("modal-edit-amount").value = filteredObject[0].amount;
        // document.getElementById("modal-edit-date").value = filteredObject[0].date;

        this.$modalEditBrandPlaceholder.value = filteredObject[0].brand;
        this.$modalEditNamePlaceholder.value = filteredObject[0].name;
        this.$modalEditAmountPlaceholder.value = filteredObject[0].amount;
        this.$modalEditDatePlaceholder.value = filteredObject[0].date;

        this.$modalEdit.classList.toggle("open-modal-edit");

    }




    // close edit modal fn
    closeModalEdit() {
        this.$modalEdit.classList.toggle("open-modal-edit");

        // when back button in the modal clicked run this fn
    }


    saveModalEdit() {

        console.log("save clicked");


        // getting the updated values inside the modal by the customer

        // .value is dynamically updated as the user updated the modal input values and then
        // we will update this target object in the this.allCars array
        console.log(this.clickedId, this.$modalEditBrandPlaceholder.value,
            this.$modalEditNamePlaceholder.value,
            this.$modalEditAmountPlaceholder.value,
            this.$modalEditDatePlaceholder.value);

        // instant placeholders in the memory for the current input data
        let brand = this.$modalEditBrandPlaceholder.value
        let name = this.$modalEditNamePlaceholder.value
        let amount = this.$modalEditAmountPlaceholder.value
        let date = this.$modalEditDatePlaceholder.value

        // see them
        console.log(brand, name, amount, date);




        let updatedArray = this.allCars.map(item => {
            if (item.id === Number(this.clickedId)) {
                return {...item, brand: brand, name: name, amount: amount, date: date }
            } else {
                return item;
            }
        });

        this.allCars = [...updatedArray];


        this.saveData();
        this.filterData();

        console.log(this.clickedId);
        console.log(this.allCars);


        this.renderTableData();

        this.closeModalEdit();


    }






    // close delete modal fn
    closeModalDelete() {
        this.$modalDelete.classList.toggle("open-modal-delete");

        // here we need last confrimation for delete
    }


    // SEARCH FNs



    filterData() {



        let brandString = this.$divSearchBrandInput.value.toLowerCase();
        let nameString = this.$divSearchNameInput.value.toLowerCase();
        let dateString = this.$divSearchDateInput.value.toLowerCase();

        console.log(brandString, nameString, dateString);




        let filtered = this.allCars.filter(veri =>
            veri.brand.toLowerCase().includes(brandString)).filter(veri =>
            veri.name.toLowerCase().includes(nameString)).filter(veri => veri.date.includes(dateString));


        console.log(filtered);

        this.filteredCars = filtered;

        console.log(this.filteredCars);






    }





    handleClickSearchButton(e) {

        this.$divSearchTable.classList.remove("invisible-to-user");

        //e.preventDefault();


        if (!this.allCars.length > 0) {
            alert("no customers yet... plase add some customers");
            return;
        }

        console.log(this.allCars);

        this.filterData();

        this.renderTableData();


        // this.sortData(this.filteredCars);




    }






    // ADD PAGE Fns










    // INDEPENDENT FNs



    // validate and Make the array of objects

    validateAndCreate() {


        let dateInput = this.$divAddDateInput.value;

        let lastTwoDigitsOfCurrentYear = new Date().getFullYear().toString().slice(-2);

        if (dateInput !== "" &&
            dateInput.length === 8 &&
            dateInput[2] === "-" &&
            dateInput[5] === "-" &&
            dateInput.slice(0, 2) <= lastTwoDigitsOfCurrentYear &&
            dateInput.slice(3, 5) > 0 &&
            dateInput.slice(3, 5) <= 12 &&
            dateInput.slice(-2) > 0 &&
            dateInput.slice(-2) <= 31
        ) {

            this.isDateValid = true;
            this.transformedDateInput = dateInput;


        } else {

            this.isDateValid = false;
            alert("please enter a valid date");

        }

        console.log(this.isDateValid);


        let carsInput = this.$divAddTextareaAddCars.value;

        if (carsInput.includes("\t") &&
            carsInput.includes("\n") &&
            carsInput !== "") {

            this.isFormValid = true;

            let splitDataByLine = carsInput.split("\n");
            console.log(splitDataByLine);
            let splitDataByTab = splitDataByLine.map(item => item.split("\t"));

            console.log(splitDataByTab);

            splitDataByTab.map(item => {

                let obj = {
                    brand: this.selectedBrand.toLowerCase(),
                    name: item[0].toLowerCase(),
                    amount: item[1].toLowerCase(),
                    date: this.transformedDateInput,
                    id: this.allCars.length > 0 ? this.allCars[this.allCars.length - 1].id + 1 : 1
                };

                this.allCars = [...this.allCars, obj];

                this.saveData();

                console.log(this.allCars);

            });

        } else {
            this.isFormValid = false;
            alert("please enter customers in valid form");

        }


        console.log(this.isFormValid);

        // only if both are true then make the array of objects
        // otherwise alert the user

        if (this.isDateValid && this.isFormValid) {

            let answer = confirm("add these customers?")

            if (answer === true) {

                console.log("true");

                console.log(this.$divAddSelectBrand.value);
                // this.transformDateEntered(); // ok

                // this.transformDataEnteredIntoTextareaIntoArrayOfObjects();


                // this.saveData();

            } else {
                return;
            }


        } else {
            console.log("INCOMPLETE DATA!!!");
            return;
        }

    }



    sortData(array) {


        this.sortOrder = !this.sortOrder;

        let sortBy = this.sortCriteria.toLowerCase();


        if (sortBy === "amount") {

            array.sort((a, b) => {
                if (this.sortOrder === true) {

                    return a[sortBy] - b[sortBy];

                } else if (this.sortOrder === false) {

                    return b[sortBy] - a[sortBy];

                }

            });

        } else if (sortBy === "brand" || sortBy === "name" || sortBy === "date" || sortBy === "id") {

            array.sort((a, b) => {
                if (this.sortOrder === true) {
                    if (a[sortBy] < b[sortBy]) return -1;
                    if (a[sortBy] > b[sortBy]) return 1;
                    return 0;
                } else if (this.sortOrder === false) {
                    if (a[sortBy] > b[sortBy]) return -1;
                    if (a[sortBy] < b[sortBy]) return 1;
                    return 0;
                }

            });
        }

        this.renderTableData();

    }


    renderTableData() {

        if (this.filteredCars.length > 0) {

            let htmlForTable = this.filteredCars.map((item, index) =>

                `
    <tr class="one-customer-row">
        <th scope="row" >${index+1}</th>
        <td class="one-customer" data-id="${item.id}">${item.brand}</td>
        <td class="one-customer" data-id="${item.id}">${item.name}</td>
        <td class="one-customer" data-id="${item.id}">${item.amount}</td>
        <td class="one-customer" data-id="${item.id}">${item.date}</td>
        <td class="one-customer" data-id="${item.id}">${item.id}</td>
        <td class="one-customer edit-one-customer" data-id="${item.id}">✏️</td>
        <td class="one-customer delete-one-customer" data-id="${item.id}">❌</td>
    </tr>
    `

            ).join("");

            this.$dataTable.innerHTML = htmlForTable;

        } else if (this.filteredCars.length === 0) {

            let htmlForTable = this.allCars.map((item, index) =>

                `
    <tr class="one-customer-row">
        <th scope="row" >${index+1}</th>
        <td class="one-customer" data-id="${item.id}">${item.brand}</td>
        <td class="one-customer" data-id="${item.id}">${item.name}</td>
        <td class="one-customer" data-id="${item.id}">${item.amount}</td>
        <td class="one-customer" data-id="${item.id}">${item.date}</td>
        <td class="one-customer" data-id="${item.id}">${item.id}</td>
        <td class="one-customer edit-one-customer" data-id="${item.id}">✏️</td>
        <td class="one-customer delete-one-customer" data-id="${item.id}">❌</td>
    </tr>
    `

            ).join("");

            this.$dataTable.innerHTML = htmlForTable;




        }

    }





    handleEditIcon(e) {

        if (e.target.classList.contains("edit-one-customer")) {

            // here dataset.id is in String form so remember to use it accordingly (Number etc)
            this.clickedId = e.target.dataset.id;

            this.openModalEdit();

        }

    }


    // when table delete is clicked

    handleDeleteIcon(e) {



        if (e.target.classList.contains("delete-one-customer")) {


            this.clickedId = e.target.dataset.id

            let brand = document.querySelector("#modal-delete-brand")
            let name = document.querySelector("#modal-delete-name")
            let amount = document.querySelector("#modal-delete-amount")
            let date = document.querySelector("#modal-delete-date")
            let id = document.querySelector("#modal-delete-id")


            let obj = this.allCars.find(item => item.id === Number(this.clickedId))

            brand.innerHTML = `brand : ${obj.brand}`
            name.innerHTML = `name : ${obj.name}`
            amount.innerHTML = `amount : ${obj.amount}`
            date.innerHTML = `date : ${obj.date}`
            id.innerHTML = `id : ${obj.id}`



            this.$modalDelete.classList.toggle("open-modal-delete");



        }


    }

    // when modal delete is clicked

    deleteCustomer() {



        console.log(this.allCars);





        if (confirm("Confirm delete customer?")) {

            let filtered1 = this.allCars.filter(item => item.id !== Number(this.clickedId));

            let filtered2 = this.filteredCars.filter(item => item.id !== Number(this.clickedId))

            this.allCars = [...filtered1]
            this.filteredCars = [...filtered2]

            this.saveData();

            this.renderTableData()

            this.closeModalDelete()

        } else {

            null

        }


    }





    saveData() {

        localStorage.setItem('cars', JSON.stringify(this.allCars));

    }









    // CALCULATIONS and REPORT


    calculations(array, brand) {

        // let totalSales = array.reduce((acc, curr) => {
        //     return acc + Number(curr.amount)
        // }, 0)


        let totalSales = array.filter(item => item.brand === brand).
        reduce((acc, curr) => {
            return acc + Number(curr.amount)
        }, 0)

        let howManyCustomersPaidOrNotPaidAltogether = array.filter(item => item.brand === brand).length

        let totalNotPaid = array.filter(item => item.brand === brand).
        filter(item => item.name.includes("%")).
        reduce((acc, curr) => {
            return acc + Number(curr.amount)
        }, 0)

        let howManyNotPaid = array.filter(item => item.brand === brand).
        filter(item => item.name.includes("%")).length

        console.log(totalSales, howManyCustomersPaidOrNotPaidAltogether, totalNotPaid, howManyNotPaid, );

        console.log(this.allCars.filter(item => item.brand === brand))


        let htmlCardToDisplay =
            `
             
    <div class="card">
      <div class="card-header">
        ${brand.charAt(0).toUpperCase() + brand.slice(1)} 
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Total Sales : ${totalSales}</li>
        <li class="list-group-item">Total Customers : ${howManyCustomersPaidOrNotPaidAltogether}</li>
        <li class="list-group-item">Total Amount Not Paid : ${totalNotPaid}</li>
        <li class="list-group-item">Total Customers Not Paid : ${howManyNotPaid} </li>
      </ul>
    </div>
    <br>
    `

        //console.log(htmlCardToDisplay)

        return htmlCardToDisplay


    }


    // we need to also run this fn when we update the data (edit, delete functions)

    makeBrandCardAfterCalculations() {



        if (!this.allCars.length > 0) {
            alert("no customers yet... plase add some customers");
            return;
        }


        let listOfBrands = this.allCars.map(item => item.brand);
        let setOfListOfBrands = [...new Set(listOfBrands)];

        let htmlCard = setOfListOfBrands.map(item => this.calculations(this.allCars, item)).join("");

        console.log(htmlCard)

        this.$divSee.innerHTML = htmlCard;


    }







}


new App();