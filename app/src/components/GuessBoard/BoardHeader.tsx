export default function BoardHeader() {
  return (
    <div className="board-row">
      <div className="gridItem">
        <p className="columnTitle">Name</p>
      </div>
      <div className="gridItem">
        <p className="columnTitle">Nat</p>
      </div>
      <div className="gridItem">
        <p className="columnTitle">Reg</p>
      </div>
      <div className="gridItem">
        <p className="columnTitle">Team</p>
      </div>
      <div className="gridItem">
        <p className="columnTitle">Age</p>
      </div>
      <div className="gridItem">
        <p className="columnTitle">LANS</p>
      </div>
    </div>
  );
}
