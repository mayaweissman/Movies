import React, { Component } from "react";
import jsPDF from "jspdf";

console.clear()

export class Boilerplate extends React.Component {
  state={}
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const data = {
  firstName: 'john',
  lastName: 'donohue',
  email: 'john.donohue@trendcycle.co',
}

export class Pdf extends React.Component {
  state={}
  componentDidMount() {
    this.setup()
  }
  download=event=>{
    this.doc.save('sample.pdf')
  }
  setup() {
    const doc = new jsPDF()
    const el = document.getElementById('content')
    if (typeof(el)==='object'&&el!==null) {
      const width = 170
      const elementHandlers = {
        '#ignorePDF': (element,renderer)=>{
          return true
        }
      }
      doc.fromHTML(el,15,15,{width,elementHandlers},()=>{
        const pdf = doc.output('datauristring')
        if (typeof(pdf)==='string'&&pdf.length>0) {
          this.setState({pdf})
        }
      })
    }
    this.doc = doc
  }
  renderPreview() {
    const {pdf} = this.state
    if (typeof(pdf)==='string'&&pdf.length>0) {
      return (
        <div style={{
            height:'650px',
            position:'relative',
            zIndex:999,
            border: '1px solid #000',
          }}>
          <embed className="pdfobject" src={pdf} type="application/pdf" style={{
              overflow: 'auto',
              width: '100%',
              height: '100%',
            }} internalinstanceid="30"></embed>
          {/*
            <iframe title="preview" src={pdf} style={{
                width: '100%',
                height: '700px',
              }} frameBorder="0"></iframe>
          */}
        </div>
      )
    }
    return null
  }
  renderData() {
    const keys = Object.keys(data)
    return (
      <div class="row">
        {
          keys.map((e,i)=>(
            <div class="col">
              <label>{e}</label>
              <div className="data">{data[e]}</div>
            </div>
          ))
        }
      </div>
    )
  }
  render() {
    return (
      <div className="container">
        <h1>ReactJS: jsPDF</h1>
        
        <div className="row">
          <div className="col-6">
            <div className="mb-3">
              <button className="btn btn-outline-primary" onClick={this.download}>Save as PDF</button>
            </div>
            <div id="content">
              <h2>Title</h2>
              <p className="lead">Lead</p>
              {this.renderData()}
            </div>
          </div>
          <div className="col-6">
            {this.renderPreview()}
          </div>
        </div>
      </div>
    )
  }
}
