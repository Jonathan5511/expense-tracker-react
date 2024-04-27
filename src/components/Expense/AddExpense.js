import { Fragment, useRef, useState} from 'react';
import classes from './AddExpense.module.css'
import ExpensesList from "./ExpensesList";
import { useSelector,useDispatch } from 'react-redux';
import { expenseActions } from '../../store/ExpenseData';
import { Button } from 'react-bootstrap';


const AddExpense =()=>{
    const dispatch = useDispatch();
    const expense= useSelector(state => state.expense.expense)
    const premium = useSelector(state=>state.expense.showPremium)
    const download = useSelector(state=>state.expense.showDownload)
    const [submit,setSubmit] = useState('')
    const [editConfirm,setEditConfirm] = useState(false)
    const [editId,setEditId]=useState('')
    const amountInputRef = useRef()
    const desInputRef = useRef()
    const catInputRef = useRef()
    const editAmountInputRef = useRef()
    const editDesInputRef = useRef()
    const editCatInputRef = useRef()

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

    const onEditHandler=(id)=>{
        setEditId(id)
        setEditConfirm(true)
        fetch(`https://react-prep-c813f-default-rtdb.firebaseio.com/expense/${id}.json`
        ).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage = 'Data retreival failed'
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error (errorMessage)
                })
            }
        }).then(data=>{
            editAmountInputRef.current.value=data.amount
            editDesInputRef.current.value=data.description
            editCatInputRef.current.value=data.category
        }).catch(err=>{
            alert(err.message)
        })

    }

    const onConfirmEditHandler=event=>{
        setEditConfirm(false)
        event.preventDefault()
        const editEnteredAmount = editAmountInputRef.current.value
        const editEnteredDescription = editDesInputRef.current.value
        const editEnteredCategory = editCatInputRef.current.value
        if(editEnteredAmount.trim().length===0 || editEnteredDescription.trim().length===0 || editEnteredCategory.trim().length===0){
            alert('Enter all details!!')
            return
        }
        fetch(`https://react-prep-c813f-default-rtdb.firebaseio.com/expense/${editId}.json`,{
            method:'PUT',
            body:JSON.stringify({
                amount:editEnteredAmount,
                description:editEnteredDescription,
                category:editEnteredCategory
            }),
            headers:{'Content-Type':'application.json'}
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                return res.json().then(data=>{
                    let errorMessage = 'Data edit failed!'
                    if(data && data.error && data.error.message){
                        errorMessage=data.error.message
                    }
                    throw new Error (errorMessage)
                })
            }
        }).then(data=>{
            setSubmit(data.amount)
        }).catch(err=>{
            alert(err.message)
        })


    }

    const onDownloadButtonHandler=()=>{
        dispatch(expenseActions.toggleDownload())
        document.body.style='background:#1f1f1f'
    }

    const onCloseDownloadButtonHandler=()=>{
        dispatch(expenseActions.toggleDownload())
        dispatch(expenseActions.togglePremium())
        document.body.style='background:white'
    }

    const ondownloadHandler=()=>{
        const headers = Object.keys(expense[0]).toString()
        const main = expense.map(item=>{
            return Object.values(item).toString()
        })
        const csv = [headers, ...main].join('.\n')
        startCsvDownload(csv)
    }

    const startCsvDownload=(input)=>{
        const blob = new Blob([input], {type: 'application/json'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.download='test-csv.csv'
        a.href=url
        a.style.display='none'
        document.body.appendChild(a)
        a.click()
        a.remove()
        URL.revokeObjectURL(url)
    }

    return(
        <Fragment>
            {!download && !editConfirm && <div className={classes.control}>
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
            </div>}
            {!download && editConfirm && <div className={classes.control}>
                <form onSubmit={onConfirmEditHandler}>
                    <label htmlFor="amount">Expense Amount:</label>
                    <input id="amount" type="number" ref={editAmountInputRef}></input>
                    <label htmlFor="des">Description:</label>
                    <input id="des" type="text" ref={editDesInputRef}></input>
                    <label htmlFor="cat">Category:</label>
                    <select id="cat" ref={editCatInputRef}>
                    <option value='food'>Food</option>
                    <option value='petrol'>Petrol</option>
                    <option value='clothes'>Clothes</option>
                    </select>
                    <button type='submit' >Confirm Edit</button>  
                </form>
            </div>}
            {!download && premium && <div className={classes.control}>
                <Button type='button' variant='dark'  onClick={onDownloadButtonHandler}>Activate Premium</Button>
            </div>}
            <div>
                {!download && <ExpensesList submitChange={submit} editExpense={onEditHandler}/>}
            </div>
            {download && <div className={classes.control}>
                <button type='button' onClick={ondownloadHandler}>Download CSV</button>
                <button type='button' onClick={onCloseDownloadButtonHandler}>Back</button>
            </div>}
        </Fragment>
        
        
    )
}

export default AddExpense;