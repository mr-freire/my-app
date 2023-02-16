import createEngine, { DiagramModel, DefaultNodeModel, DefaultLinkModel } from '@projectstorm/react-diagrams';
import * as React from 'react';
import { CanvasWidget } from '@projectstorm/react-canvas-core';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { RecordTriggeredFlow } from './IRecordTriggeredFlow'
import flowData from './testRecordFlow.json'

export default () => {
	const nodeTypes = ['actionCalls', 'loops', 'conditions', 'triggers', 'start', 'assignments',
	'collectionProcessors', 'decisions', 'recordCreates', 'recordUpdates', 'recordDeletes', 'recordLookups', 'subflows'];

	var engine = createEngine();

	var model = new DiagramModel();

	let flowToDebug = JSON.parse(JSON.stringify(flowData)) as RecordTriggeredFlow;
	let previousNode;
	let nodeMap = new Map<string, DefaultNodeModel>();
	let connectionMap = new Map<string, string>();
	Object.entries(flowToDebug.Flow).forEach(([key, value]) => {
		//if the key is an array, loop through the array and create a node for each item
		if (nodeTypes.includes(key)) {
			if (Array.isArray(value)) {
				value.forEach((item, index) => {
					let node = new DefaultNodeModel({
						name: item.name, 
						color: 'rgb(192,255,0)'});
					node.setPosition(item.locationY, item.locationX);
					previousNode = node;
					model.addNode(node);
					nodeMap.set(item.name, node)
					switch (key) {
						case 'loops':
							if (item.nextValueConnector) {
								connectionMap.set(item.name, item.nextValueConnector[0].targetReference);
							}
							connectionMap.set(item.name, item.noMoreValuesConnector[0].targetReference);	
							break;
						default: 
						if (item.connector) {
							connectionMap.set(item.name, item.connector.targetReference);
						}
					}
				})
			} else { 
				let node = new DefaultNodeModel({
					name: value.name, 
					color: 'rgb(192,255,0)'});
				node.setPosition(value.locationX, value.locationY);
				previousNode = node;
				model.addNode(node);
				nodeMap.set(value.name, node)
				if (value.connector) {
					connectionMap.set(value.name, value.connector.targetReference);
				}
			}
		}
	});
	connectionMap.forEach((value, key) => {
		console.log(key, value);
		let sourceNode = nodeMap.get(key) as DefaultNodeModel;
		let targetNode = nodeMap.get(value) as DefaultNodeModel;
		if (sourceNode && targetNode) {
			let sourcePort = sourceNode.addOutPort('connectorOut');
			let targetPort = targetNode.addInPort('connectorIn');
			let link = sourcePort.link<DefaultLinkModel>(targetPort);
			link.getOptions().testName = 'Test';
			model.addAll(sourceNode, targetNode, link);
		}
	})

	//TODO - add the rest of the nodes and links
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