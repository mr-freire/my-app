export interface RecordTriggeredFlow {
    Flow: Flow;
}

export interface Flow {
    actionCalls:           ActionCall[];
    apiVersion:            number;
    assignments:           Assignments;
    collectionProcessors:  CollectionProcessor[];
    decisions:             Decisions;
    environments:          string;
    interviewLabel:        string;
    label:                 string;
    loops:                 Loops;
    processMetadataValues: ProcessMetadataValue[];
    processType:           string;
    recordCreates:         Assignments;
    recordDeletes:         Assignments;
    recordLookups:         RecordLookups;
    recordUpdates:         Assignments;
    start:                 Start;
    status:                string;
    subflows:              Assignments;
    variables:             Variable[];
}

export interface ActionCall {
    name:                 string;
    label:                string;
    locationX:            number;
    locationY:            number;
    actionName:           string;
    actionType:           string;
    connector?:           Connector;
    flowTransactionModel: string;
    inputParameters:      InputParameter[] | InputParametersClass;
}

export interface Connector {
    targetReference: string;
}

export interface InputParameter {
    name:  string;
    value: InputParameterValue;
}

export interface InputParameterValue {
    elementReference?: string;
    stringValue?:      string;
}

export interface InputParametersClass {
    name:  string;
    value: InputParametersValue;
}

export interface InputParametersValue {
    elementReference: string;
}

export interface Assignments {
    name:              string;
    label:             string;
    locationX:         number;
    locationY:         number;
    assignmentItems?:  AssignmentItems;
    connector?:        Connector;
    inputReference?:   string;
    inputAssignments?: InputAssignments;
    flowName?:         string;
}

export interface AssignmentItems {
    assignToReference: string;
    operator:          string;
    value:             InputParametersValue;
}

export interface InputAssignments {
    field: string;
    value: InputParametersValue;
}

export interface CollectionProcessor {
    name:                        string;
    elementSubtype:              string;
    label:                       string;
    locationX:                   number;
    locationY:                   number;
    assignNextValueToReference?: string;
    collectionProcessorType:     string;
    collectionReference:         string;
    conditionLogic?:             string;
    conditions?:                 CollectionProcessorConditions;
    connector:                   Connector;
    sortOptions?:                SortOptions;
}

export interface CollectionProcessorConditions {
    leftValueReference: string;
    operator:           string;
    rightValue:         RightValueClass;
}

export interface RightValueClass {
    stringValue: string;
}

export interface SortOptions {
    doesPutEmptyStringAndNullFirst: boolean;
    sortField:                      string;
    sortOrder:                      string;
}

export interface Decisions {
    name:                  string;
    label:                 string;
    locationX:             number;
    locationY:             number;
    defaultConnector:      Connector;
    defaultConnectorLabel: string;
    rules:                 Rules;
}

export interface Rules {
    name:           string;
    conditionLogic: string;
    conditions:     RulesConditions;
    connector:      Connector;
    label:          string;
}

export interface RulesConditions {
    leftValueReference: string;
    operator:           string;
    rightValue:         RightValue;
}

export interface RightValue {
    stringValue: number;
}

export interface Loops {
    name:                  string;
    label:                 string;
    locationX:             number;
    locationY:             number;
    collectionReference:   string;
    iterationOrder:        string;
    nextValueConnector:    Connector;
    noMoreValuesConnector: Connector;
}

export interface ProcessMetadataValue {
    name:  string;
    value: RightValueClass;
}

export interface RecordLookups {
    name:                             string;
    label:                            string;
    locationX:                        number;
    locationY:                        number;
    assignNullValuesIfNoRecordsFound: boolean;
    connector:                        Connector;
    filterLogic:                      string;
    filters:                          Filters;
    getFirstRecordOnly:               boolean;
    object:                           string;
    storeOutputAutomatically:         boolean;
}

export interface Filters {
    field:    string;
    operator: string;
    value:    InputParametersValue;
}

export interface Start {
    locationX:         number;
    locationY:         number;
    connector:         Connector;
    filterFormula:     string;
    object:            string;
    recordTriggerType: string;
    scheduledPaths:    ScheduledPaths;
    triggerType:       string;
}

export interface ScheduledPaths {
    connector: Connector;
    pathType:  string;
}

export interface Variable {
    name:         string;
    dataType:     string;
    isCollection: boolean;
    isInput:      boolean;
    isOutput:     boolean;
    objectType?:  string;
}

