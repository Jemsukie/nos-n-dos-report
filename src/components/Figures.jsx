function MonitorStack({ labels }) {
  return (
    <div className="stacks">
      {labels.map((row) => (
        <div className={`layer ${row.kind || ''}`} key={row.kind || row.cells.join()}>
          {row.cells.map((cell) => (
            <div className="box" key={cell} dangerouslySetInnerHTML={{ __html: cell }} />
          ))}
        </div>
      ))}
    </div>
  )
}

export function RolesFigure() {
  return (
    <div className="stage">
      <div className="panel">
        <h2>A · Client–server</h2>
        <div className="org">
          <div className="node server"><b>Server</b><span>always on</span></div>
          <div className="clients">
            <div className="node"><b>Client</b><span>asks</span></div>
            <div className="node"><b>Client</b><span>asks</span></div>
            <div className="node"><b>Client</b><span>asks</span></div>
          </div>
        </div>
        <p className="flow">A server waits and provides. A client requests and uses the answer.</p>
      </div>
      <div className="panel">
        <h2>B · Peer-to-peer</h2>
        <div className="peers">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <line x1="25" y1="25" x2="75" y2="25" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="25" y1="75" x2="75" y2="75" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="25" y1="25" x2="25" y2="75" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="75" y1="25" x2="75" y2="75" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="25" y1="25" x2="75" y2="75" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <line x1="75" y1="25" x2="25" y2="75" stroke="#64ddc5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
          {['Peer 1', 'Peer 2', 'Peer 3', 'Peer 4'].map((name) => (
            <div className="node teal" key={name}><b>{name}</b><span>asks and answers</span></div>
          ))}
        </div>
        <p className="flow">Every peer can ask and provide. No single machine must stay on.</p>
      </div>
    </div>
  )
}

export function WindowsFigure() {
  return (
    <div className="stage">
      <div className="panel domain">
        <div className="srv-row">
          <div className="node server"><b>Domain controller</b><span>AD DS · users, computers, policies</span></div>
          <div className="repl"><span className="arrow">←——→</span>replicate</div>
          <div className="node server"><b>Second controller</b><span>replica of the directory</span></div>
          <div className="node teal"><b>File server</b><span>shared folders and printers</span></div>
        </div>
        <div className="linkbar">CLIENTS REQUEST ACCOUNTS, FOLDERS, AND PRINTERS</div>
        <div className="cli-row">
          <div className="node"><b>Lab PC 1</b><span>own Windows</span></div>
          <div className="node"><b>Lab PC 2</b><span>own Windows</span></div>
          <div className="node"><b>Staff laptop</b><span>own Windows</span></div>
          <div className="node"><b>Linux workstation</b><span>joins the domain</span></div>
        </div>
      </div>
    </div>
  )
}

export function SsiFigure() {
  return (
    <div className="stage">
      <div className="panel">
        <h2>A · Network operating system</h2>
        <MonitorStack labels={[
          { cells: ['User app', 'User app', 'User app'] },
          { cells: ['Own OS<small>local services</small>', 'Own OS<small>local services</small>', 'Own OS<small>local services</small>'] },
          { kind: 'hw', cells: ['<b>M1</b>', '<b>M2</b>', '<b>M3</b>'] },
        ]} />
        <p className="net">network between the machines</p>
        <p className="flow">The user knows which machine holds which resource. Each OS can be changed on its own.</p>
      </div>
      <div className="panel">
        <h2>B · Distributed operating system</h2>
        <MonitorStack labels={[
          { kind: 'image', cells: ['One system image<br>applications and users see one system'] },
          { kind: 'hw', cells: ['<b>M1</b>', '<b>M2</b>', '<b>M3</b>'] },
        ]} />
        <p className="net">the system places the work and the data</p>
        <p className="flow">The user does not need to know where work runs or where data is stored.</p>
      </div>
    </div>
  )
}

export function HdfsFigure() {
  return (
    <div className="stage">
      <div className="panel hdfs">
        <div className="node client-box">
          <b>Client</b>
          <span>read / write /data/report.csv</span>
          <p className="flow">Sends metadata requests. Does not choose the disks.</p>
        </div>
        <div className="node namenode">
          <b>NameNode · master</b>
          <span>namespace, block map, replication decisions</span>
          <p className="flow">Heartbeats come up from every DataNode. A silent node is treated as dead.</p>
        </div>
        <div className="racks">
          <div className="rack">
            <h3>RACK 1</h3>
            <div className="chip"><b>DataNode A</b><br /><em>block 1 · replica 1</em><br />writer’s node</div>
            <div className="chip">DataNode B<br />other blocks</div>
          </div>
          <div className="rack">
            <h3>RACK 2 · REMOTE</h3>
            <div className="chip"><b>DataNode C</b><br /><em>block 1 · replica 2</em></div>
            <div className="chip"><b>DataNode D</b><br /><em>block 1 · replica 3</em></div>
            <div className="chip">DataNode E<br />other blocks</div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FIGURES = {
  roles: RolesFigure,
  windows: WindowsFigure,
  ssi: SsiFigure,
  hdfs: HdfsFigure,
}

export default function Figure({ id }) {
  const View = FIGURES[id]
  return <View />
}
