import React, { useState, useEffect } from 'react';

import ReactFlow, {
  removeElements,
  addEdge,
  Background,
  Controls,
  OnLoadParams,
  EdgeTypesType,
  Connection,
  Edge,
  ArrowHeadType,
  Handle
} from 'react-flow-renderer';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import FloatingEdge from './FloatingEdge';
import FloatingConnectionLine from './FloatingConnectionLine';
import { createElements } from './utils';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
		borderRadius: 10
  },
};

var defaultInitialElements = [
	{
		id: 'incoming',
		type: 'socialIncoming',
		position: { x: 200, y: 700 },
	}
];

const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const getRandomArbitrary = (min, max) => {
	return Math.random() * (max - min) + min;
}

const CustomNodeComponent = ({data, isConnectable}) => {
	return (
		<div className="incoming-handle-container">
			<Handle
				type="source"
				className="incoming-handle"
				position="right"
			/>
			<div className="entry-obj incoming-obj">
				<div className="cover"></div>
				<img src="/assets/img/incoming.png" alt="incoming img" />
			</div>
		</div>
	);
};

// database 1
const DatabaseCustomNodeComponent = ({ data, isConnectable }) => {
	return (
		<div className="database-handle-container">
			<Handle 
				type="target"
				position='top'
				className="db-target-handle"
				style={{right: 0}}
			/>
			<Handle 
				type="target"
				position='right'
				className="db-target-handle"
			/>
			<Handle 
				type="source"
				position='right'
				className="db-source-handle"
			/>
			<div className="entry-obj">
				<div className="cover"></div>
				<img src={'/assets/img/database.png'} alt="database img" />
			</div>
			<Handle 
				type="target"
				position='bottom'
				className="db-target-handle"
			/>
			<Handle 
				type="target"
				position='left'
				className="db-target-handle"
			/>
		</div>
	)
}

// database 2
const DatabaseCustomNode2Component = ({ data, isConnectable }) => {
	return (
		<div className="database-handle-container">
			<Handle 
				type="target"
				position='top'
				className="db-target-handle"
				style={{right: 0}}
			/>
			<Handle 
				type="target"
				position='right'
				className="db-target-handle"
			/>
			<Handle 
				type="source"
				position='right'
				className="db-source-handle-2"
			/>
			<div className="entry-obj">
				<div className="cover"></div>
				<img src={'/assets/img/database.png'} alt="database img" />
			</div>
			<Handle 
				type="target"
				position='bottom'
				className="db-target-handle"
			/>
			<Handle 
				type="target"
				position='left'
				className="db-target-handle"
			/>
		</div>
	)
}

// web server 1
const WebserverCustomNodeComponent = ({ data, isConnectable }) => {
	return (
		<div className="server-handle-container">
			<Handle 
				type="target"
				position='top'
				className="db-target-handle"
				style={{right: 0}}
			/>
			<Handle 
				type="target"
				position='right'
				className="db-target-handle"
			/>
			<Handle 
				type="source"
				position='right'
				className="server-source-handle"
			/>
			<div className="entry-obj">
				<div className="cover"></div>
				<img src={'/assets/img/server.png'} alt="server img" />
			</div>
			<Handle 
				type="target"
				position='bottom'
				className="db-target-handle"
			/>
			<Handle 
				type="target"
				position='left'
				className="db-target-handle"
			/>
		</div>
	)
}

const WebserverCustomNode2Component = ({ data, isConnectable }) => {
	return (
		<div className="server-handle-container">
			<Handle 
				type="target"
				position='top'
				className="server-target-handle"
				style={{right: 0}}
			/>
			<Handle 
				type="target"
				position='right'
				className="server-target-handle"
			/>
			<Handle 
				type="source"
				position='right'
				className="server-source-handle-2"
			/>
			<div className="entry-obj">
				<div className="cover"></div>
				<img src={'/assets/img/server.png'} alt="server img" />
			</div>
			<Handle 
				type="target"
				position='bottom'
				className="server-target-handle"
			/>
			<Handle 
				type="target"
				position='left'
				className="server-target-handle"
			/>
		</div>
	)
}

const edgeTypes = {
  floating: FloatingEdge
};

const nodeTypes = {
	socialIncoming: CustomNodeComponent,
	database: DatabaseCustomNodeComponent,
	database2: DatabaseCustomNode2Component,
	webserver: WebserverCustomNodeComponent,
	webserver2: WebserverCustomNode2Component,
}


const NodeAsHandleFlow = () => {
  const [elements, setElements] = useState(defaultInitialElements);
  const [tmp, setTmp] = useState([]);
	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [mapName, setMapName] = useState('');
	const [mapNames, setMapNames] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [isMapList, setIsMapList] = useState(false);
	const [selectedMap, setSelectedMap] = useState({});

  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const onConnect = (params) =>
    setElements((els) => addEdge({ ...params, type: 'floating', arrowHeadType: ArrowHeadType.Arrow }, els));

	const onNodeDragStop = (event, node) => {
		setElements((els) =>
			els.map((el) => {
				if(el.id === node.id) {
					return node;
				} else {
					return el;
				}
			})
		);
	};

  const createDatabase = () => {
    let len = elements.length;
    let tmp = elements;
    let databaseObj = {
      id: len + 1 + '',
      type: "database",
      position: { x: getRandomArbitrary(100, 200), y: getRandomArbitrary(600, 700) },
    }
    tmp.push(databaseObj);
    setTmp(tmp);
  }

  const createDatabase2 = () => {
    let len = elements.length;
    let tmp = elements;
    let databaseObj = {
      id: len + 1 + '',
      type: "database2",
      position: { x: getRandomArbitrary(100, 200), y: getRandomArbitrary(600, 700) },
    }
    tmp.push(databaseObj);
    setTmp(tmp);
  }

  const createWebServer = () => {
    let len = elements.length;
    let tmp = elements;
    let serverObj = {
      id: len + 1 + '',
      type: "webserver",
      position: { x: getRandomArbitrary(100, 200), y: getRandomArbitrary(600, 700) },
    }
    tmp.push(serverObj);
    setTmp(tmp);
  }

  const createWebServer2 = () => {
    let len = elements.length;
    let tmp = elements;
    let serverObj = {
      id: len + 1 + '',
      type: "webserver2",
      position: { x: getRandomArbitrary(100, 200), y: getRandomArbitrary(600, 700) },
    }
    tmp.push(serverObj);
    setTmp(tmp);
  }

  useEffect(() => {
		if(tmp.length > 0) {
			setElements(tmp);
		}
		setElements((els) =>
			els.map((el) => {
				return el;
			})
		);
	}, [tmp])

	useEffect(() => {
		Modal.setAppElement(document.getElementById('home'));
		getMapList();
	}, []);

	const getMapList = () => {
		fetch("/api/maplist", { 
			method: "GET",
			headers: {
			'Content-Type': 'application/json'
			} 
		})
		.then(res => res.json())
		.then(json => {
			setMapNames(json);
		});
	}

	const saveMap = () => {
		setIsOpen(true);
	}

	const closeModal = () => {
    setIsOpen(false);
  }

	const saveMapData = () => {
		setIsOpen(false);
		fetch("/api/saveMap", { 
			method: "POST",
			headers: {
			'Content-Type': 'application/json'
			}, 
			body: JSON.stringify({
				mapName: mapName,
				elements: elements
			}) 
		})
		.then(res => res.json())
		.then(json => {
			getMapList();
			setMapName('');
			toast.success('Map data has been successfully saved!');
		});
	}

	const mapNameChange = (ev) => {
		setMapName(ev.target.value);
	}

	const searchMap = (e) => {
		e.preventDefault();
		setSearchValue(e.target.value);
		const results = [];
		mapNames.map(map => {
			if(map.mapName.toLowerCase().includes(e.target.value)) {
				results.push(map)
			}
		});
		setSearchResults(results);
	}

	const selectMap = (e, data) => {
		e.preventDefault();
		setSelectedMap(data);
	}

	const openMap = (e) => {
		e.preventDefault();
		setIsMapList(false);
		setTmp(selectedMap.elements);
	}

  return (
    <div className="home-page" id="home">
		<ToastContainer />
			<div className="header">
				<div className="logo">
					<span className="logo-text">Infraduck</span>
				</div>
				<div className="header-content">
					<div className="search">
						<input placeholder="Enter your map name" onClick={e => {
							e.preventDefault();
							setIsMapList(true);
						}} onChange={e => searchMap(e)} />
						{
							isMapList ? searchValue === '' ? <div className="maplist">
														{
															mapNames.map(name => {
																return <div className={selectedMap._id === name._id ? "map-name active" : "map-name"} key={name.mapName} onClick={e => selectMap(e, name)}>
																	{name.mapName}
																</div>
															})
														}
													</div> : <div className="maplist">
														{
															searchResults.length !== 0 &&
															searchResults.map(name => {
																return <div className={selectedMap._id === name._id ? "map-name active" : "map-name"} key={name.mapName} onClick={e => selectMap(e, name)}>
																	{name.mapName}
																</div>
															})
														}
													</div> : null
						}
					</div>
					<div className="open-btn" onClick={openMap}>
						<span>Open</span>
						<span style={{marginRight: '0px'}}>&gt;</span>
					</div>
				</div>
			</div>
			<div className="main">
				<div className="sidebar">
					<div className="user">
						<img className="img-responsive" src={'/assets/img/user.png'} alt="user" />
					</div>
					<div className="web-server">
						<div className="title">Web Servers</div>
						<div className="item" onClick={createWebServer}>
							<i className="fa fa-plus"></i>
							<span>Web Server 1</span>
						</div>
						<div className="item" onClick={createWebServer2}>
							<i className="fa fa-plus"></i>
							<span>Web Server 2</span>
						</div>
					</div>	
					<div className="database">
						<div className="title">Database Instances</div>	
						<div className="item" onClick={createDatabase}>
							<i className="fa fa-plus"></i>
							<span>Database 1</span>
						</div>
						<div className="item" onClick={createDatabase2}>
							<i className="fa fa-plus"></i>
							<span>Database 2</span>
						</div>
					</div>
				</div>
				<div className="content">
					<div className="custom-breadcrumb">
						<span>Home</span>
						<span style={{marginRight: '5px', marginLeft: '5px'}}>&gt;</span>
						<span>Map</span>
					</div>
					<div className="page-title">
						<div className="title-big">Add your objects</div>
						<div className="title-small">Select any object from the menu to add it to the map, then simply drag it into position.</div>
					</div>
					<div className="flow">
						<div className="floatingedges" style={modalIsOpen ? {visibility: 'hidden'} : {}}>
							<div className="save-btn" onClick={saveMap}>Save Map &gt;</div>
							<ReactFlow
								elements={elements}
								onElementsRemove={onElementsRemove}
								onConnect={onConnect}
								onLoad={onLoad}
								edgeTypes={edgeTypes}
								nodeTypes={nodeTypes}
								connectionLineComponent={FloatingConnectionLine}
								onNodeDragStop={onNodeDragStop}
							>
								<Background variant='lines' color="#000" gap={28} size={1} className='map-background' />
								<Controls />
							</ReactFlow>
						</div>
					</div>
				</div>
			</div>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
						ariaHideApp={false}
			>
				<h2>Please input the map name</h2>
				<form>
				<input type='text' onChange={ev => mapNameChange(ev)} value={mapName} />
				</form>
						<div className='actions'>
							<div className='saves-btn' onClick={saveMapData}>Save</div>
							<div className='cancel-btn' onClick={closeModal}>Cancel</div>
						</div>
			</Modal>
		</div>
    
  );
};

export default NodeAsHandleFlow;