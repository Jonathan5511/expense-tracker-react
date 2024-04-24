import { Fragment, useRef, useState} from 'react';
import classes from './AddExpense.module.css'
import ExpensesList from "./ExpensesList";

const AddExpense =()=>{
    const [submit,setSubmit] = useState('')
    const amountInputRef = useRef()
    const desInputRef = useRef()
    const catInputRef = useRef()

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value
        const enteredDescription = desInputRef.current.value
        const enteredCategory = catInputRef.current.value
        if(enteredAmount.trim().length===0 || enteredDescription.trim().length===0 || enteredCategory.trim().length===0){
            alert('Enter all details!!')
            return
        }
        fetch('https://react-prep-c813f-default-rtdb.firebaseio.com/expense.json',{
            method:'POST',
            body:JSON.stringify({
                amount:enteredAmount,
                description:enteredDescription,
                category:enteredCategory
            }),
            headers:{'Content-Type':'application/json'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage='Data not stored!!'
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error (errorMessage)
                })
            }
        }).then(data=>{
            setSubmit(data.name)
          
        }).catch(err=>{
            alert(err.message)
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
                <ExpensesList submitChange={submit}/>
            </div>
        </Fragment>
        
        
    )
}

export default AddExpense;