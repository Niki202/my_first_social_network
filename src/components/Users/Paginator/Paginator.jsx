import classes from "./Paginator.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {Form, Field} from "react-final-form";


export const Paginator = (props) => {
    const {totalUsers, pageSize, currentPage, onPageClicked} = props

    const onSubmitGoTo = (data) => {
        window.history.pushState(null, '', '/users/' + data.goTo)
        onPageClicked(+data.goTo)
    }

    const validator = (data) => {
        const errors = {}
        if (+data.goTo <= 0 || +data.goTo > pagesCount) errors.goTo = 'error'
        return errors
    }

    const pagesCount = Math.ceil(totalUsers / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let startPageInd = currentPage - 3 < 0 ? 0 : currentPage - 3
    if (currentPage <= 4) startPageInd = 0
    let endPageInd = currentPage + 6 > totalUsers ? totalUsers : currentPage + 6
    if (currentPage >= 97) endPageInd = endPageInd - 2
    if (currentPage >= 997) endPageInd = endPageInd - 1
    pages = pages.slice(startPageInd, endPageInd)
    // if (slicePages.indexOf(1) === -1) {
    //     pages = [1,...pages]
    // }
    // if (slicePages.indexOf(pagesCount) === -1) {
    //     pages = [...pages, pagesCount]
    // }
    return (
        <div className={classes.paginationWrapper}>
            {/*Кнопка "в начало" и троеточие*/}

            <div>
                {currentPage >= 5 &&
                    <>
                        <NavLink className={`${classes.buttonWithText}`}
                                 to={`/users/${startPageInd + 1}`}
                                 onClick={() => onPageClicked(1)} tabIndex={-1}
                        >To start</NavLink>
                        <div className={`${classes.button} ${classes.threeDots}`}>...</div>
                    </>}

                {/*Мапимся по массиву с цифрами*/}
                {pages.map(page => {
                    return (
                        <NavLink
                            className={`${classes.button} ${page === currentPage && classes.selected}`}
                            key={page.toString()} to={`/users/${page}`}
                            onClick={() => onPageClicked(page)} tabIndex={-1}>
                            {page}
                        </NavLink>
                    )
                })}
                {/*Кнопка дальше*/}
                {currentPage < pagesCount &&
                    <>
                        <div className={`${classes.button} ${classes.threeDots}`}>...</div>
                        <NavLink className={`${classes.buttonWithText}`}
                                 to={`/users/${currentPage + 1}`}
                                 onClick={() => onPageClicked(currentPage + 1)} tabIndex={-1}>Next</NavLink>
                    </>}
            </div>
            <Form onSubmit={onSubmitGoTo}
                  initialValues={{}}
                  validate={validator}
                  render={({handleSubmit, form, submitting, pristine, values}) => (
                      <form onSubmit={handleSubmit}
                            className={classes.form}>
                          <div className={classes.goTo}>
                              Go to
                          </div>
                          <Field name='goTo'>
                              {({meta, input}) => (
                                  <div className={classes.input}>
                                      <div
                                          className={`${classes.inputWrapper}`}>
                                          <input
                                              {...input}
                                              className={classes.inputNumber}
                                              type="number"
                                              size='5'
                                              tabIndex='1'
                                              autoComplete={'off'}
                                              placeholder={`1-${pagesCount}`}
                                          />
                                      </div>
                                      <button
                                          className={`${classes.submit} ${(pristine || meta.error) && classes.inActive}`}
                                          type="submit" disabled={pristine || submitting}>
                                          Go
                                      </button>
                                  </div>

                              )}

                          </Field>

                      </form>
                  )}
            />
        </div>
    )
}