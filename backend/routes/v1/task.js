const express = require('express')
const router = express.Router()
const Auth = require('../../middelware/Auth')
const userModel = require('../../models/user')
const { addListValidator } = require('../../validators/task')
const { default: mongoose } = require('mongoose')
const _ = require('lodash')

router.post('/add', Auth, (req, res) => {
    // console.log('be inja reside');
    const checkTaskInput = addListValidator(req.body)
    if (checkTaskInput.error)
        res.status(400).send({ message: checkTaskInput.error?.message })
    else {
        console.log(req.user);

        userModel.findById(req.user._id).then(user => {
            if (!user)
                res.status(401).send({ message: 'کاربر یافت نشد' })
            else {
                user.toDoList.push(_.pick(req.body, [
                    'task'
                ]))
                user.save().then(user => {
                    res.status(200).send({ message: 'کار مورد نظر اضافه شد', list: user.toDoList })
                }).catch(error => {
                    res.status(500).send({ message: error?.message })
                })
            }
        }).catch(error => {
            res.status(500).send({ message: error?.message })
        })
    }
})

router.get('/', Auth, (req, res) => {
    userModel.findById(req.user._id).then(user => {
        if (!user)
            res.status(401).send({ message: 'کاربر یافت نشد' })
        else
            res.status(200).send({ message: 'لیسا کار ها', list: user.toDoList })
    }).catch(error => {
        res.status(500).send({ message: error?.message })
    })
})

router.post('/edit/:id', Auth, (req, res) => {
    const checkTaskInput = addListValidator(req.body)
    if (checkTaskInput.error)
        res.status(400).send({ message: checkTaskInput.error?.message })
    else {
        userModel.findById(req.user._id).then(user => {
            if (!user)
                res.status(401).send({ message: 'کاربر یافت نشد' })
            else {
                const taskId = req.params.id

                if (!mongoose.isValidObjectId(taskId))
                    return res.status(400).send({ message: "unvalid moongoose id" })

                if (!user.toDoList.id(taskId))
                    return res.status(400).send({ message: "unvalid task id" })

                user.toDoList.id(taskId).task = req.body.task

                user.save().then(user => {
                    res.status(200).send({ message: 'کار مورد نظر تغییر یافت', list: user.toDoList })
                }).catch(error => {
                    res.status(500).send({ message: error?.message })
                })
            }
        }).catch(error => {
            res.status(500).send({ message: error?.message })
        })
    }
})
router.delete('/delete/:id', Auth, (req, res) => {

    userModel.findById(req.user._id).then(async user => {
        if (!user)
            res.status(401).send({ message: 'کاربر یافت نشد' })
        else {
            const taskId = req.params.id

            if (!mongoose.isValidObjectId(taskId))
                return res.status(400).send({ message: "unvalid moongoose id" })

            if (!user.toDoList.id(taskId))
                return res.status(400).send({ message: "unvalid task id" })

            await user.toDoList.id(taskId).deleteOne()

            user.save().then(user => {
                res.status(200).send({ message: 'کار مورد نظر حذف شد', list: user.toDoList })
            }).catch(error => {
                res.status(500).send({ message: error?.message })
            })
        }
    }).catch(error => {
        res.status(500).send({ message: error?.message })
    })
})

router.delete('/delete', Auth, (req, res) => {

    userModel.findById(req.user._id).then(async user => {
        if (!user)
            res.status(401).send({ message: 'کاربر یافت نشد' })
        else {

            user.toDoList = []

            user.save().then(user => {
                res.status(200).send({ message: 'همه کارها حذف شد', list: user.toDoList })
            }).catch(error => {
                res.status(500).send({ message: error?.message })
            })
        }
    }).catch(error => {
        res.status(500).send({ message: error?.message })
    })
})

router.get('/toggleState/:id', Auth, (req, res) => {
    userModel.findById(req.user._id).then(user => {
        if (!user)
            res.status(401).send({ message: 'کاربر یافت نشد' })
        else {
            const taskId = req.params.id

            if (!mongoose.isValidObjectId(taskId))
                return res.status(400).send({ message: "unvalid moongoose id" })

            if (!user.toDoList.id(taskId))
                return res.status(400).send({ message: "unvalid task id" })

            user.toDoList.id(taskId).state = !user.toDoList.id(taskId).state

            user.save().then(user => {
                res.status(200).send({ message: 'کار مورد نظر اضافه شد', list: user.toDoList })
            }).catch(error => {
                res.status(500).send({ message: error?.message })
            })
        }
    }).catch(error => {
        res.status(500).send({ message: error?.message })
    })
})

router.post('/toggleAllStates', Auth, (req, res) => {
    userModel.findById(req.user._id).then(user => {
        if (!user)
            res.status(401).send({ message: 'کاربر یافت نشد' })
        else {
            user.toDoList.forEach((task, index) => {
                user.toDoList[index].state = !task.state
            })
            user.save().then(user => {
                res.status(200).send({ message: 'همه ی کارها تغییر یافت', list: user.toDoList })
            }).catch(error => {
                res.status(500).send({ message: error?.message })
            })
        }
    }).catch(error => {
        res.status(500).send({ message: error?.message })
    })
})

module.exports = router