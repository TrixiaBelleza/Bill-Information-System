'use strict';

const db = require(__dirname + '/../lib/mysql');


exports.get_all_bills = (req, res, next) => {
	db.query('SELECT * FROM bill', [], (err, result) => {
		res.send(result);
	});
};

exports.get_all_senators = (req, res, next) => {
	db.query('SELECT * FROM senator', [], (err, result) => {
		res.send(result);
	});
};

exports.get_bill = (req, res, next) => {
	const data = {
		bill_name: req.query.bill_name
	};
	db.query('SELECT * FROM bill where lower(bill_name) = lower(?)', [data.bill_name], (err, result) => {
		res.send(result);
	});
};

exports.get_senator = (req, res, next) => {
	const data = {
		senator_name: req.query.senator_name
	};
	db.query('SELECT * FROM senator where lower(senator_name) = lower(?)', [data.senator_name], (err, result) => {
		res.send(result);
	});
};

exports.get_housemember = (req, res, next) => {
	const data = {
		house_member_name: req.query.house_member_name
	};
	db.query('SELECT * FROM house_member where lower(house_member_name) = lower(?)', [data.house_member_name], (err, result) => {
		res.send(result);
	});
};

exports.get_all_housemembers = (req, res, next) => {
	db.query('SELECT * FROM house_member', [], (err, result) => {
		res.send(result);
	});
};

exports.get_all_bills_filed_by_senator = (req, res, next) => {
	
	db.query('SELECT * FROM bill where bill_number IN (select senator_bill_number from senator) where lower(senator_id) = lower(?)', [data.senator_id], (err, result) => {
		res.send(result);
	});

}

exports.get_senate_bill_by_status = (req, res, next) => {
	const data = {
		status: req.query.status
	};
	db.query('SELECT * FROM bill where bill_number IN (select senator_bill_number from senator) AND lower(bill.status) = lower(?)', [data.status], (err, result) => {
		res.send(result);
	});
};

exports.get_house_bill_by_status = (req, res, next) => {
	const data = {
		status: req.query.status
	};
	db.query('SELECT * FROM bill where bill_number IN (select house_member_bill_number from house_member) AND lower(bill.status) = lower(?)', [data.status], (err, result) => {
		res.send(result);
	});
};


exports.get_senate_bill_by_senator = (req, res, next) => {
	const data = {
		senator_name: req.query.senator_name
	};
	db.query('SELECT * FROM bill where bill_number IN (select senator_bill_number from senator where lower(senator_name) = lower(?)) ', [data.senator_name], (err, result) => {
		res.send(result);
	});
};

exports.get_house_bill_by_house_member = (req, res, next) => {
	const data = {
		house_member_name: req.query.house_member_name
	};
	db.query('SELECT * FROM bill where bill_number IN (select house_member_bill_number from house_member where lower(house_member_name) = lower(?)) ', [data.house_member_name], (err, result) => {
		res.send(result);
	});
};

exports.get_senate_bill_by_year = (req, res, next) => {
	const data = {
		year_filed: req.query.year_filed
	};
	db.query('select * from bill where bill_number IN (select senator_bill_number from senator) and year(bill.date_filed) = ?; ', [data.year_filed], (err, result) => {
		res.send(result);
	});
};

exports.get_house_bill_by_year = (req, res, next) => {
	const data = {
		year_filed: req.query.year_filed
	};
	db.query('SELECT * FROM bill where bill_number IN (select house_member_bill_number from house_member) and year(bill.date_filed) = ? ', [data.year_filed], (err, result) => {
		res.send(result);
	});
};


exports.add_bill = (req, res, next) => {
	console.log(req.body);
	const data = {
		bill_number: req.body.data.bill_number,
		bill_name: req.body.data.bill_name,
		date_passed : req.body.data.date_passed,
		status : req.body.data.status,
		legal_history : req.body.data.legal_history,
		date_filed : req.body.data.date_filed
	};

	console.log(data);
	const query_string = 'INSERT INTO bill (bill_number, bill_name, date_passed, status, legal_history, date_filed) VALUES (?, ?, ?, ?, ?, ?)';

	db.query(query_string, [data.bill_number, data.bill_name, data.date_passed, data.status, data.legal_history, data.date_filed], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};


exports.add_housemember = (req, res, next) => {
	console.log(req.body);
	const data = {
		house_member_id: req.body.data.house_member_id,
		house_member_name: req.body.data.house_member_name,
		house_member_bill_number : req.body.data.house_member_bill_number,
		email : req.body.data.email,
		date_elected : req.body.data.date_elected,
		position : req.body.data.position,
	};

	console.log(data);
	const query_string = 'INSERT INTO house_member (house_member_id, house_member_name, house_member_bill_number, email, date_elected, position) VALUES (?, ?, ?, ?, ?, ?)';

	db.query(query_string, [data.house_member_id, data.house_member_name, data.house_member_bill_number, data.email, data.date_elected, data.position], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.add_senator = (req, res, next) => {
	console.log(req.body);
	const data = {
		senator_id: req.body.data.senator_id,
		senator_name: req.body.data.senator_name,
		senator_bill_number : req.body.data.senator_bill_number,
		email : req.body.data.email,
		date_elected : req.body.data.date_elected,
		position : req.body.data.position,
	};

	console.log(data);
	const query_string = 'INSERT INTO senator (senator_id, senator_name, senator_bill_number, email, date_elected, position) VALUES (?, ?, ?, ?, ?, ?)';

	db.query(query_string, [data.senator_id, data.senator_name, data.senator_bill_number, data.email, data.date_elected, data.position], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.delete_bill = (req, res, next) => {
	console.log(req.body);
	const data = {
		bill_number: req.body.data.bill_number,		
	};

	console.log(data);
	const query_string = 'DELETE FROM bill where bill_number =?';

	db.query(query_string, [data.bill_number], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.delete_senator = (req, res, next) => {
	console.log(req.body);
	const data = {
		senator_id: req.body.data.senator_id,		
	};
	console.log(data);
	const query_string = 'DELETE FROM senator where senator_id =?';

	db.query(query_string, [data.senator_id], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.delete_housemember = (req, res, next) => {
	console.log(req.body);
	const data = {
		house_member_id: req.body.data.house_member_id,		
	};

	console.log(data);
	const query_string = 'DELETE FROM house_member where house_member_id =?';

	db.query(query_string, [data.house_member_id], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.update_senator = (req, res, next) => {
	console.log(req.body);
	const data = {
		senator_id: req.params.senator_id,
		senator_name: req.body.data.senator_name,
		email : req.body.data.email,
		position: req.body.data.position,
	};
	console.log(data);
	const query_string = 'UPDATE senator SET senator_name= ?, email=?,position=? where senator_id=?'

	db.query(query_string, [data.senator_name, data.email, data.position, data.senator_id], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.update_housemember = (req, res, next) => {
	console.log(req.body);
	const data = {
		house_member_id: req.params.house_member_id,
		house_member_name: req.body.data.house_member_name,
		email : req.body.data.email,
		position: req.body.data.position,
	};
	console.log(data);
	const query_string = 'UPDATE house_member SET house_member_name= ?, email=?,position=? where house_member_id=?'

	db.query(query_string, [data.house_member_name, data.email, data.position, data.house_member_id], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};

exports.update_bill = (req, res, next) => {
	console.log(req.body);
	const data = {
		bill_number: req.params.bill_number,
		bill_name: req.body.data.bill_name,
		status : req.body.data.status,
		legal_history: req.body.data.legal_history,
	};
	console.log(data);
	const query_string = 'UPDATE bill SET bill_name= ?, status=?, legal_history=? where bill_number=?'

	db.query(query_string, [data.bill_name, data.status, data.legal_history, data.bill_number], (err, result) => {
		
		if(err) console.log(err);
		
		res.send(result);
	});
};
