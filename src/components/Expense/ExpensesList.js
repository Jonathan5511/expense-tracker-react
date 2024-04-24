import { Fragment } from "react";
import { Col, Row, Table } from "react-bootstrap";
import classes from './ExpensesList.module.css'

const ExpensesList=(props)=>{
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
                                    {props.expenseList.map((expense)=>{
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