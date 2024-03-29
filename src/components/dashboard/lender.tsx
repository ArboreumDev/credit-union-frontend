import DynamicDoughnut from "./doughnut"
import LineChart from "./linechart"

export default () => {
  return (
    <div>
      <div className="grid-container">
        <div className="item1">
          <DynamicDoughnut />
        </div>
        <div className="item2">
          <LineChart />
        </div>
        <div className="item3">
          <h2>Loan Requests</h2>
          <table className="bp3-html-table .modifier">
            <thead>
              <tr>
                <th>Person</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="bp3-skeleton">Blueprint</p>
                </td>
                <td>
                  <p className="bp3-skeleton">CSS framework and UI toolkit</p>
                </td>
                <td>
                  <p className="bp3-skeleton">Sass, TypeScript, React</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bp3-skeleton">TSLint</p>
                </td>
                <td>
                  <p className="bp3-skeleton">
                    Static analysis linter for TypeScript
                  </p>
                </td>
                <td>
                  <p className="bp3-skeleton">TypeScript</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bp3-skeleton">Plottable</p>
                </td>
                <td>
                  <p className="bp3-skeleton">
                    Composable charting library built on top of D3
                  </p>
                </td>
                <td>
                  <p className="bp3-skeleton">SVG, TypeScript, D3</p>
                </td>
              </tr>
            </tbody>
          </table>
          <h2>Guarantor Requests</h2>
          <table className="bp3-html-table .modifier">
            <thead>
              <tr>
                <th>Person</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="bp3-skeleton">Blueprint</p>
                </td>
                <td>
                  <p className="bp3-skeleton">CSS framework and UI toolkit</p>
                </td>
                <td>
                  <p className="bp3-skeleton">Sass, TypeScript, React</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bp3-skeleton">TSLint</p>
                </td>
                <td>
                  <p className="bp3-skeleton">
                    Static analysis linter for TypeScript
                  </p>
                </td>
                <td>
                  <p className="bp3-skeleton">TypeScript</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bp3-skeleton">Plottable</p>
                </td>
                <td>
                  <p className="bp3-skeleton">
                    Composable charting library built on top of D3
                  </p>
                </td>
                <td>
                  <p className="bp3-skeleton">SVG, TypeScript, D3</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div></div>

      <style jsx>
        {`
          .grid-container {
            display: grid;
            grid-template-columns: auto auto;
            grid-gap: 10px;
            padding: 10px;
            justify-items: center;
          }
          .item3 {
            grid-column-start: 1;
            grid-column-end: 3;
          }
          .grid-container > div {
            text-align: center;
            padding: 20px 0;
            font-size: 30px;
          }
        `}
      </style>
    </div>
  )
}
