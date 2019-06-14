'use strict';

const bill_controller = require(__dirname + '/../controllers/controller');

module.exports = (router) => {
	//VIEW
	router.get('/find-all-bills', bill_controller.get_all_bills);
	router.get('/find-all-senators', bill_controller.get_all_senators);
	router.get('/find-all-housemembers', bill_controller.get_all_housemembers);	
	router.get('/find-bill', bill_controller.get_bill);	
	router.get('/find-senator', bill_controller.get_senator);
	router.get('/find-housemember', bill_controller.get_housemember);

	//SEARCH BY
	router.get('/find-bills-filed-by-senator/:senator_id', bill_controller.get_all_bills_filed_by_senator);
	router.get('/find-senate-bill-by-status', bill_controller.get_senate_bill_by_status);
	router.get('/find-house-bill-by-status', bill_controller.get_house_bill_by_status);
	router.get('/find-senate-bill-by-year', bill_controller.get_senate_bill_by_year);
	router.get('/find-house-bill-by-year', bill_controller.get_house_bill_by_year);
	router.get('/find-senate-bill-by-senator', bill_controller.get_senate_bill_by_senator);
	router.get('/find-house-bill-by-house-member', bill_controller.get_house_bill_by_house_member);

	//EDIT
	router.post('/edit-senator/:senator_id', bill_controller.update_senator);
	router.post('/edit-housemember/:house_member_id', bill_controller.update_housemember);
	router.post('/edit-bill/:bill_number', bill_controller.update_bill);

	//ADD
	router.post('/add-bill', bill_controller.add_bill);
	router.post('/add-senator', bill_controller.add_senator);
	router.post('/add-housemember', bill_controller.add_housemember);

	//DELETE
	router.post('/delete-senator', bill_controller.delete_senator);
	router.post('/delete-bill', bill_controller.delete_bill);
	router.post('/delete-housemember', bill_controller.delete_housemember);
	return router;
};