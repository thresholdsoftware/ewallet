import result from 'lodash/result';
import {getTotalAmount} from '../utils/transformer.util';

const acknowledgePayment = (req, res) => {
	sails.log("Call back received with the details: ",req.body)
	const orderReference = result(req, 'body.order_reference');
	Transaction.findOne({everyPay:orderReference}).then((t)=> {
		if(t!==undefined || t!==null){
			sails.log("Transaction is already completed");
			return res.status(200) 
		}
	})
	UserProfile.findOne({userType: 'PAYMENT_ADMIN'}).then((cardUser) => {
		if (!cardUser) {
			throw {message: 'No Bank User in the system'};
		}
		const amountInEuros = result(req,'body.amount');

		const amount = amountInEuros*24500;

		const fee = 0;
		return  {
			fromAccount: cardUser.account,
			toAccount: result(req, 'body.userId');
			transactionType: 'CARD_TO_WALLET',
			note: '',
			amount,
			fee,
			totalAmount: getTotalAmount(amount, fee)
		};
	}).then((transaction)=>{
		const t = transaction;
		return Transaction.create(t);
	}).then((tr) => {
			return res.status(200).json(tr)
		})
	.catch((err)=>
			return res.status(500).json(err));
};

module.exports = {
  acknowledgePayment
};




