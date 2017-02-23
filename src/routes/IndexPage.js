import React from 'react';
import cx from 'classnames';
import { connect } from 'dva';
import styles from './IndexPage.css';

const IndexPage = React.createClass({
    render () {
        let { list, filter, checkAll } = this.props;
        list = list instanceof Array ? list : [];
        const unCompletedLength = list.filter(item => !item.checked).length;
        switch (filter) {
            case 'all': break;
            case 'active': list = list.filter (item => !item.checked);break;
            case 'completed': list = list.filter (item => item.checked);break;
            default: break;
        }
        return (
            <div className = { styles.container }>
                <header>todos</header>
                <main>
                    <div className = { styles['todo-input'] }>
                        <span className = { cx({[styles.active]: checkAll }) } onClick = { this.clickCheckAll }>❯</span>
                        <input type = "text" placeholder = "what needs to be done?" onKeyDown = { this.onEnterDown } />
                    </div>
                    <ul className = { styles['todo-list'] }>
                    {
                        list.map( (todo, index) => {
                            return (
                              <li key = {index}>
                                <span className = { cx({[styles.checked]: todo.checked }) } onClick = { this.clickCheck.bind(this, index) }></span>
                                    <span className = { styles.content }>{ todo.content }</span>
                                    <span onClick = { this.clickClearOne.bind(this, index) }>x</span>
                                </li>
                            );
                        })
                    }
                    </ul>
                    <div className = { styles['todo-control'] }>
                        <span>{ `${unCompletedLength} ${ unCompletedLength === 1 ? 'item' : 'items' } left` }</span>
                        <div className = { styles.filter }>
                            <a className = { cx({[styles.active]: filter === 'all'}) } onClick = { this.clickFilter.bind(this, 'all') }>All</a>
                            <a className = { cx({[styles.active]: filter === 'active'}) } onClick = { this.clickFilter.bind(this, 'active') }>Active</a>
                            <a className = { cx({[styles.active]: filter === 'completed'}) } onClick = { this.clickFilter.bind(this, 'completed') }>Completed</a>
                        </div>
                        <span className = { styles.clear } onClick = { this.clickClearCompleted }>Clear Completed</span>
                    </div>
                </main>
                <footer>dvajs todomvc sample</footer>
            </div>
        );
    },
    onEnterDown (event) {
        console.log(event.keyCode);
        if (event.keyCode !== 13) return ;
        if (!event.target.value.length) return ;
        this.unshift(event.target.value);
        event.target.value = '';
    },
    unshift (content) {
        const payload = {};
        payload.data = { content, checked: false };
        this.props.dispatch({ type: 'todo/unshift', payload });
    },
    clickFilter (filter) {
        this.props.dispatch({ type: 'todo/filter', payload: { filter }});
    },
    clickCheck (index) {
        this.props.dispatch({ type: 'todo/check', payload: { index }});
    },
    clickCheckAll () {
        this.props.dispatch({ type: 'todo/checkAll' });
    },
    clickClearOne (index) {
        this.props.dispatch({ type: 'todo/clearOne', payload: { index  }});
    },
    clickClearCompleted () {
        this.props.dispatch({ type: 'todo/clearCompleted' });
    }
});
IndexPage.propTypes = {
};

function mapStateToProps(state) {
    const { list, filter, checkAll } = state.todo;
    return { list, filter, checkAll };
}
export default connect(mapStateToProps)(IndexPage);
