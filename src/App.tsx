import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { RecordTriggeredFlow } from './IRecordTriggeredFlow'
import flowData from './testRecordFlow.json'

export default () => {
	//1) setup the diagram engine
	var engine = createEngine();

	//2) setup the diagram model
	var model = new DiagramModel();

	//3-A) create a default node
	var node1 = new DefaultNodeModel({
		name: 'Node 1',
		color: 'rgb(0,192,255)'
	});
	node1.setPosition(100, 100);
	let port1 = node1.addOutPort('Out');

	//3-B) create another default node
	var node2 = new DefaultNodeModel('Node 2', 'rgb(192,255,0)');
	let port2 = node2.addInPort('In');
	node2.setPosition(400, 100);

	// link the ports
	let link1 = port1.link<DefaultLinkModel>(port2);
	link1.getOptions().testName = 'Test';
	//4) add the models to the root graph
	model.addAll(node1, node2, link1);

	//5) load model into engine

	let flowToDebug = JSON.parse(JSON.stringify(flowData)) as RecordTriggeredFlow;
	let previousNode;
	let nodeMap = new Map<string, DefaultNodeModel>();
	let connectionMap = new Map<string, string>();
	Object.entries(flowToDebug.Flow).forEach(([key, value]) => {
		//if the key is an array, loop through the array and create a node for each item
		if (Array.isArray(value)) {
			value.forEach((item, index) => {
				let node = new DefaultNodeModel({
					name: item.name, 
					color: 'rgb(192,255,0)'});
				node.setPosition(item.locationY, item.locationX);
				previousNode = node;
				model.addNode(node);
				nodeMap.set(item.name, node)
				if (key === 'loops') {
					if (item.nextValueConnector) {
						connectionMap.set(item.name, item.nextValueConnector[0].targetReference);
					}
					connectionMap.set(item.name, item.noMoreValuesConnector[0].targetReference);
				} else if (item.connector) {
					connectionMap.set(item.name, item.connector.targetReference);
				}
			})
		}
	});
	//now that we have all the nodes, we can create the links using a for i in connectionMap.size() loop
	connectionMap.forEach((value, key) => {
		console.log(key, value);
		let sourceNode = nodeMap.get(key) as DefaultNodeModel;
		let targetNode = nodeMap.get(value) as DefaultNodeModel;
		if (sourceNode && targetNode) {
			let sourcePort = sourceNode.addOutPort('sape');
			let targetPort = targetNode.addInPort('sapito');
			let link = sourcePort.link<DefaultLinkModel>(targetPort);
			link.getOptions().testName = 'Test';
			link.addLabel('Hello World!');
			model.addAll(sourceNode, targetNode, link);
		}
	})

	//TODO - add the rest of the nodes and links
	//TODO - add start and end nodes
	//TODO - add scheduled path
	//TODO - info to nodes
	//TODO - add labels to links
	
	engine.setModel(model);
	//6) render the diagram!
	return (
		<DemoCanvasWidget>
			<CanvasWidget engine={engine} />
		</DemoCanvasWidget>
	);
};