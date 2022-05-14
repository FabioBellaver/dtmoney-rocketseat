import { Container } from './styles';
import { useTransactions } from '../../hooks/useTransactions';

import incomesImg from '../../assets/income.svg'
import outcomesImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'

export function Summary() {

    const { transactions } = useTransactions();

    const summary = transactions.reduce((acc, transaction) => {
        console.log(transactions)
        if (transaction.transactionType == 'deposit') {
            acc.deposits += transaction.amount
            acc.total += transaction.amount
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }
        return acc;
    }, {
        deposits: 0,
        withdraws: 0,
        total: 0,
    })
    
    return (
        <Container>
            <div>
                <header>
                    <p>Incomes</p>
                    <img src={incomesImg} alt="Incomes" />
                </header>
                <strong>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.deposits)}
                </strong>
            </div>
            <div>
                <header>
                    <p>Outcomes</p>
                    <img src={outcomesImg} alt="Outcomes" />
                </header>
                <strong>
                    -{new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.withdraws)}
                </strong>
            </div>
            <div className='highlited-background'>
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(summary.total)}
                </strong>
            </div>
        </Container>
    )
}