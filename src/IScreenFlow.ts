export interface ScreenFlow {
    Flow: Flow;
}

export interface Flow {
    actionCalls:           ActionCalls;
    apiVersion:            number;
    assignments:           Assignment[];
    collectionProcessors:  CollectionProcessors;
    decisions:             Decision[];
    environments:          string;
    formulas:              Formula[];
    interviewLabel:        string;
    label:                 string;
    loops:                 Loop[];
    processMetadataValues: ProcessMetadataValue[];
    processType:           string;
    recordLookups:         RecordLookup[];
    recordUpdates:         RecordUpdates;
    screens:               Screen[];
    sourceTemplate:        string;
    start:                 Start;
    status:                string;
    textTemplates:         TextTemplate[];
    variables:             Variable[];
}

export interface ActionCalls {
    description:          string;
    name:                 string;
    label:                string;
    locationX:            number;
    locationY:            number;
    actionName:           string;
    actionType:           string;
    connector:            DefaultConnectorClass;
    faultConnector:       DefaultConnectorClass;
    flowTransactionModel: string;
    inputParameters:      InputParameter[];
}

export interface DefaultConnectorClass {
    targetReference: string;
}

export interface InputParameter {
    name:  string;
    value: InputParameterValue;
}

export interface InputParameterValue {
    elementReference?: string;
    booleanValue?:     boolean;
}

export interface Assignment {
    description:     string;
    name:            string;
    label:           string;
    locationX:       number;
    locationY:       number;
    assignmentItems: AssignmentItem[] | AssignmentItemsClass;
    connector:       AssignmentConnector;
}

export interface AssignmentItem {
    assignToReference: string;
    operator:          string;
    value:             AssignmentItemValue;
}

export interface AssignmentItemValue {
    elementReference: string;
}

export interface AssignmentItemsClass {
    assignToReference: string;
    operator:          string;
    value:             InputParameterValue;
}

export interface AssignmentConnector {
    targetReference: string;
    isGoTo?:         boolean;
}

export interface CollectionProcessors {
    description:             string;
    name:                    string;
    elementSubtype:          string;
    label:                   string;
    locationX:               number;
    locationY:               number;
    collectionProcessorType: string;
    collectionReference:     string;
    connector:               DefaultConnectorClass;
    sortOptions:             SortOptions;
}

export interface SortOptions {
    doesPutEmptyStringAndNullFirst: boolean;
    sortField:                      string;
    sortOrder:                      string;
}

export interface Decision {
    description:           string;
    name:                  string;
    label:                 string;
    locationX:             number;
    locationY:             number;
    defaultConnector:      DefaultConnectorClass;
    defaultConnectorLabel: string;
    rules:                 Rules;
}

export interface Rules {
    name:           string;
    conditionLogic: string;
    conditions:     Condition[] | ConditionsClass;
    connector:      DefaultConnectorClass;
    label:          string;
}

export interface Condition {
    leftValueReference: string;
    operator:           string;
    rightValue:         DefaultValueClass;
}

export interface DefaultValueClass {
    booleanValue: boolean;
}

export interface ConditionsClass {
    leftValueReference: string;
    operator:           string;
    rightValue:         InputParameterValue;
}

export interface Formula {
    name:       string;
    dataType:   string;
    expression: string;
}

export interface Loop {
    description:           string;
    name:                  string;
    label:                 string;
    locationX:             number;
    locationY:             number;
    collectionReference:   string;
    iterationOrder:        string;
    nextValueConnector:    DefaultConnectorClass;
    noMoreValuesConnector: DefaultConnectorClass;
}

export interface ProcessMetadataValue {
    name:  string;
    value: ProcessMetadataValueValue;
}

export interface ProcessMetadataValueValue {
    stringValue: string;
}

export interface RecordLookup {
    description:                      string;
    name:                             string;
    label:                            string;
    locationX:                        number;
    locationY:                        number;
    assignNullValuesIfNoRecordsFound: boolean;
    connector:                        DefaultConnectorClass;
    faultConnector:                   AssignmentConnector;
    filterLogic:                      string;
    filters:                          Filter[] | FiltersClass;
    getFirstRecordOnly:               boolean;
    object:                           string;
    storeOutputAutomatically:         boolean;
}

export interface Filter {
    field:    string;
    operator: string;
    value:    FilterValue;
}

export interface FilterValue {
    elementReference?: string;
    stringValue?:      string;
}

export interface FiltersClass {
    field:    string;
    operator: string;
    value:    AssignmentItemValue;
}

export interface RecordUpdates {
    description:    string;
    name:           string;
    label:          string;
    locationX:      number;
    locationY:      number;
    connector:      DefaultConnectorClass;
    faultConnector: DefaultConnectorClass;
    inputReference: string;
}

export interface Screen {
    description: string;
    name:        string;
    label:       string;
    locationX:   number;
    locationY:   number;
    allowBack:   boolean;
    allowFinish: boolean;
    allowPause:  boolean;
    fields:      Field[] | FieldsClass;
    showFooter:  boolean;
    showHeader:  boolean;
    connector?:  DefaultConnectorClass;
}

export interface Field {
    name:            string;
    fieldText:       string;
    fieldType:       string;
    visibilityRule?: VisibilityRule;
    dataType?:       string;
    defaultValue?:   DefaultValueClass;
    isRequired?:     boolean;
    validationRule?: ValidationRule;
}

export interface ValidationRule {
    errorMessage:      string;
    formulaExpression: string;
}

export interface VisibilityRule {
    conditionLogic: string;
    conditions:     Condition;
}

export interface FieldsClass {
    name:      string;
    fieldText: string;
    fieldType: string;
}

export interface Start {
    locationX: number;
    locationY: number;
    connector: DefaultConnectorClass;
}

export interface TextTemplate {
    name:                string;
    isViewedAsPlainText: boolean;
    text:                string;
}

export interface Variable {
    name:         string;
    dataType:     string;
    isCollection: boolean;
    isInput:      boolean;
    isOutput:     boolean;
    value?:       DefaultValueClass;
    objectType?:  string;
    description?: string;
}
