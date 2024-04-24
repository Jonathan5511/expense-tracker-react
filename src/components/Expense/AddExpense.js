import { Fragment, useRef, useState } from 'react';
import classes from './AddExpense.module.css'
import ExpensesList from "./ExpensesList";

const AddExpense =()=>{
    const amountInputRef = useRef()
    const desInputRef = useRef()
    const catInputRef = useRef()
    const [expenseList,setExpenseList] = useState([])

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value
        const enteredDescription = desInputRef.current.value
        const enteredCategory = catInputRef.current.value
        if(enteredAmount.trim().length===0 || enteredDescription.trim().length===0 || enteredCategory.trim().length===0){
            alert('Enter all details!!')
            return
        }
        setExpenseList((prevList)=>{
            return [...prevList,{amount:enteredAmount,description:enteredDescription,category:enteredCategory,id:Math.random().toString()}]
        })
        amountInputRef.current.value=''
        desInputRef.current.value=''
        catInputRef.current.value=''
    }

    return(
        <Fragment>
            <div className={classes.control}>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="amount">Expense Amount:</label>
                    <input id="amount" type="number" ref={amountInputRef}></input>
                    <label htmlFor="des">Description:</label>
                    <input id="des" type="text" ref={desInputRef}></input>
                    <label htmlFor="cat">Category:</label>
                    <select id="cat" ref={catInputRef}>
                    <option value='food'>Food</option>
                    <option value='petrol'>Petrol</option>
                    <option value='clothes'>Clothes</option>
                    </select>
                    <button type='submit' >Submit</button>  
                </form>
            </div>
            <div>
                <ExpensesList expenseList={expenseList}/>
            </div>
        </Fragment>
        
        
    )
}

export default AddExpense;