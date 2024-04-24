import { Fragment, useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import classes from './ExpensesList.module.css'

const ExpensesList=(props)=>{
    const [expenseList,setExpenseList] = useState([])

    useEffect(()=>{
        fetch('https://react-prep-c813f-default-rtdb.firebaseio.com/expense.json'
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
            let uploadedData=[]
            for(const key in data){
                uploadedData.push({
                    id:key,
                    amount:data[key].amount,
                    description:data[key].description,
                    category:data[key].category
                })
            }
            setExpenseList(uploadedData)
        }).catch(err=>{
            alert(err.message)
        })
    },[props.submitChange])

    return (
        <Fragment>
            <div className="col d-flex justify-content-center ">
                    <Row>
                        <Col>
                        <div className={classes.control}>
                            <Table >
                                <thead>
                                    <tr>
                                        <th>Expense Amount</th>
                                        <th>Description</th>
                                        <th>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseList.map((expense)=>{
                                        return(<tr key={expense.id}>
                                            <td>{expense.amount}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.category}</td>
                                        </tr>)
                                    })}
                                    
                                </tbody>
                            </Table>
                            </div>
                        </Col>
                    </Row>
            </div>    
                   
            
        </Fragment>
    )
}

export default ExpensesList;