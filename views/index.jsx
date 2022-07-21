const React = require('react')
const breads = require('../controllers/breads_controller')
const Default = require('./layouts/Default')

function Index () {
    return (
      <Default>
        <h2>Index Page</h2>
        {/* <p>I have {breads[0].name} bread!</p> */}
        <ul>
            {
                breads.map((bread, index) => {
                    return (<li key={index}>
                        <a href={`/breads/${index}`}>
                        {bread.name}
                        </a>
                    </li>
                    )
                })
            }
        </ul>
      </Default>
    )
}

module.exports = Index
