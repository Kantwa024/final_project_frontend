import React, { useEffect }  from "react";
import './Report.css'
import { useNavigate } from "react-router-dom";
 
class Report extends React.Component {
  state = {
    search: "",
    name: "",
    startDate: "",
    endDate: "",
    rid: "",
    index: -1,
    uid: "",
    isAdmin: "",
    btnName: "Upload",
    data: []
  }

  changeSearch = async (e) => {
    await this.setState({
        search: e.target.value
    })

    if(this.state.search.trim().length !== 0)
    {
      this.searchData();
    }
    else
    {
      this.getMainData();
    }
  }

  changeName = (e) => {
    this.setState({
        name: e.target.value
    })
  }

  changeStartDate = (e) => {
    this.setState({
        startDate: e.target.value
    })
  }

  changeEndDate = (e) => {
    this.setState({
        endDate: e.target.value
    })
  }

  searchData = () => {

    var that = this;

    fetch("https://localhost:7280/search/" + this.state.search + "/" + this.state.uid, {
          method: 'GET',
          headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8'
          }
    })
    .then(response => {
      
      if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
    }).then(data => {
      that.setState({
        data: data
      });
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });

  }

  getExcel = () => {
    fetch("https://localhost:7280/api/ExportExcel/" + this.state.uid + "/" + this.state.search, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.ms-excel',
                'Content-Type': 'application/json;charset=UTF-8'
            }
      })
      .then(response => {
        if(response.status === 200)
        {
          response.blob().then(blob => {
            // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = 'Report.xls';
              alink.click();
          })
        }
        else
        {
          throw response.status;
        }
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPdf = () => {
    fetch("https://localhost:7280/api/ExportPdf/" + this.state.uid + "/" + this.state.search, {
            method: 'GET',
            headers: {
                'Accept': 'application/vnd.ms-excel',
                'Content-Type': 'application/json;charset=UTF-8'
            }
      })
      .then(response => {
        if(response.status === 200)
        {
          response.blob().then(blob => {
            // Creating new object of PDF file
              const fileURL = window.URL.createObjectURL(blob);
              // Setting various property values
              let alink = document.createElement('a');
              alink.href = fileURL;
              alink.download = 'Report.pdf';
              alink.click();
          })
        }
        else
        {
          throw response.status;
        }
        
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMainData = () => {
      var that = this;

      fetch("https://localhost:7280/api/Reports/" + this.state.uid, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            }
      })
      .then(response => {
        
        if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
      }).then(data => {
        that.setState({
          data: data
        })
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  
  async componentDidMount() {
      const auth = JSON.parse(localStorage.getItem('auth'));
      console.log(auth);
      
      await this.setState({
        uid: auth.Uid,
        isAdmin: auth.isAdmin
      })

      this.getMainData();
  }

  onEditClick = (indx) => {
    let indx_data = this.state.data[indx]
    this.setState({
      name: indx_data.name,
      startDate: indx_data.startDate,
      endDate: indx_data.endDate,
      rid: indx_data.rid,
      index: indx,
      btnName: "Update"
    })

    console.log(this.state.name);
  }

  onClearClick = () => {
    this.setState({
      name: "",
      startDate: "",
      endDate: "",
      rid: "",
      index: -1,
      btnName: "Upload"
    })
  }

  onUpdateClick = () => {
      let data = {
        name: this.state.name,
        startDate: this.state.startDate,
        endDate: this.state.endDate
      }

      console.log(data);
      var that = this;

      if(this.state.btnName === "Update")
      {
        fetch("https://localhost:7280/api/Reports/" + this.state.rid + "/" + this.state.uid, {
          method: 'PUT',
          headers: {
              'Accept': 'application/json, text/plain',
              'Content-Type': 'application/json;charset=UTF-8'
          },
      body: JSON.stringify(data)
    })
    .then(response => {
      
      if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
    }).then(data => {
      let new_data = that.state.data;
      new_data[that.state.index].name = that.state.name;
      new_data[that.state.index].startDate = that.state.startDate;
      new_data[that.state.index].endDate = that.state.endDate;

      that.setState({
        data: new_data
      })

      that.setState({
        name: "",
        startDate: "",
        endDate: "",
        rid: "",
        index: -1,
        btnName: "Upload"
      })

      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
      }

      else
      {
        fetch("https://localhost:7280/api/Reports/" + this.state.uid, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            },
        body: JSON.stringify(data)
      })
      .then(response => {
        
        if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
      }).then(data => {
        that.setState({
          data: [data, ...that.state.data]
        })

        that.setState({
          name: "",
          startDate: "",
          endDate: "",
          rid: "",
          index: -1,
          btnName: "Upload"
        })

        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });

      }
      
  }


  onDeleteClick = (indx) => {
      var that = this;

      fetch("https://localhost:7280/api/Reports/" + this.state.data[indx].rid + "/"+ this.state.uid, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json;charset=UTF-8'
            }
      })
      .then(response => {
        
        if(response.status === 200)
        {
          return response.json();
        }
        else
        {
          throw response.status;
        }
      }).then(data => {
        var new_data = that.state.data;
        new_data.splice(indx, 1);
        that.setState({
          data: new_data,
          name: "",
          startDate: "",
          endDate: "",
          rid: "",
          index: -1,
          btnName: "Upload"
        })


        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return(
      <div className="container">
        <div className="row my-3">
            <div className="col col-1">
                <button disabled={!this.state.isAdmin} type="button" className="btn btn-primary custom" onClick={this.getExcel}>Export Excel</button>
            </div>
            
            <div className="col col-1">

            </div>

            <div className="col col-1">
                <button disabled={!this.state.isAdmin} type="button" className="btn btn-primary custom" onClick={this.getPdf}>Export Pdf</button>
            </div>
            
            <div className="col col-5">

            </div>

            <div className="col col-4">
              <textarea className="form-control mr-sm-2 float-end custominput" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.changeSearch}/>
            </div>
        </div>

        <div className="row my-5">
            <div className="col col-7">
            <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((item, indx) => {
                return [
                  <tr key={indx}>
                  <td>{item.name}</td>
                  <td>{item.startDate}</td>
                  <td>{item.endDate}</td>
                  <td><span disabled={!this.state.isAdmin} className="material-symbols-outlined" onClick={this.state.isAdmin?() => {this.onEditClick(indx)}:null}>edit</span></td>
                  <td><span disabled={!this.state.isAdmin} className="material-symbols-outlined" onClick={this.state.isAdmin?() => {this.onDeleteClick(indx)}:null}>delete</span></td>
                </tr>
                ];
              })}
              
            </tbody>
          </table>
            </div>
          <div className="col col-1">

          </div>
          <div className="col col-4">
          <textarea className="form-control mr-sm-2 float-end custominput" value={this.state.name} onChange={this.changeName} type="text" placeholder="Name" aria-label="Name"/>
          <textarea className="form-control mr-sm-2 float-end custominput my-3" value={this.state.startDate} onChange={this.changeStartDate} type="text" placeholder="Start Date" aria-label="Start Date"/>
          <textarea className="form-control mr-sm-2 float-end custominput" value={this.state.endDate} onChange={this.changeEndDate} type="text" placeholder="End Date" aria-label="End Date"/>
          <div className="row">
              <div className="col col-6 my-4">
              <button disabled={!this.state.isAdmin} type="button" className="btn btn-danger custom" onClick={this.onClearClick}>Clear</button>
              </div>
              <div className="col col-6 my-4">
                <button disabled={!this.state.isAdmin} type="button" className="btn btn-primary custom" onClick={this.onUpdateClick}>{this.state.btnName}</button>
              </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export function ReportWithRouter(props){
  const navigate = useNavigate();
  
    useEffect(() => {
      const auth = JSON.parse(localStorage.getItem('auth'));

      if(auth === null || auth.Uid === undefined)
      {
        navigate("/login");
      }
    },[])
    return (<Report/>);
}
 
export default Report;