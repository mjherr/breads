const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const Baker = require('../models/baker.js')

// INDEX
breads.get('/', (req, res) => {
    Baker.find()
    .then(foundBakers => {
        Bread.find()
        .then(foundBreads => {
            res.render('index', {
                breads: foundBreads,
                bakers: foundBakers,
                title: 'Index Page'
            })
        })
    })
})

// NEW
breads.get('/new', (req, res) => {
    Baker.find()
    .then(foundBakers => {
        res.render('new', {
            bakers: foundBakers
        })
    })
})

// SHOW
breads.get('/:arrayIndex', (req, res) => {
  if (Bread[req.params.arrayIndex]) {
    res.render('show', {
      bread:Bread[req.params.arrayIndex],
      index: req.params.arrayIndex,
    })
  } else {
    res.render('404')
  }
})

breads.get('/:id', (req, res) => {
    Bread.findById(req.params.id)
        .populate('baker')
        .then(foundBread => {
          const bakedBy = foundBread.getBakedBy() 
          console.log(bakedBy)
          res.render('show', {
              bread: foundBread
          })
        })
        .catch(err => {
            res.send('404')
        })
      })

// EDIT
breads.get('/:indexArray/edit', (req, res) => {
    res.render('edit', {
      bread: Bread[req.params.indexArray],
      index: req.params.indexArray
    })
})

breads.get('/:id/edit', (req, res) => {
    Baker.find()
    .then(foundBakers => { 
    Bread.findById(req.params.id) 
      .then(foundBread => { 
        res.render('edit', {
          bread: foundBread,
          bakers: foundBakers 
        })
      })
    })
  })

  breads.get('/data/seed', (req, res) => {
    Bread.insertMany([[
        {
          name: 'Rye',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1595535873420-a599195b3f4a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'French',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        },
        {
          name: 'Gluten Free',
          hasGluten: false,
          image: 'https://images.unsplash.com/photo-1546538490-0fe0a8eba4e6?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        },
        {
          name: 'Pumpernickel',
          hasGluten: true,
          image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
        }
      ]
      ])
      .then(createdBreads => {
        res.redirect('/breads')
      })
  })


// UPDATE
breads.put('/:arrayIndex', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(updatedBread => {
      console.log(updatedBread)
      res.redirect(`/breads/${req.params.id}`)
  })
})

breads.put('/:id', (req, res) => {
    if(req.body.hasGluten === 'on'){
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.findByIdAndUpdate(req.params.id, req.body, { new: true }) 
      .then(updatedBread => {
        console.log(updatedBread) 
        res.redirect(`/breads/${req.params.id}`) 
      })
  })
 

// CREATE
breads.post('/', (req, res) => {
  if (!req.body.image) {
    req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  Bread.push(req.body)
  res.redirect('/breads')
})

// DELETE
breads.delete('/:id', (req, res) => {
    Bread.findByIdAndDelete(req.params.id) 
      .then(deletedBread => { 
        res.status(303).redirect('/breads')
      })
  })
  
breads.delete('/:indexArray', (req, res) => {
  Bread.findByIdAndDelete(req.params.id)
    .then(deletedBread => {
        res.status(303).redirect('/breads')
    })
})

module.exports = breads