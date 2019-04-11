import React, { Component } from "react";

class Invitation extends Component {
  render() {
    return (
      <div className="col">
        <h4>Guests</h4>
        <form>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Guests</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>Larry</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Invitation;
