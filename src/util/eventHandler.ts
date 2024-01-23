import { EventEmitter } from "events";

const eventBus = new EventEmitter();

export const EventName = {
    EditForm: "editForm",
};

export default eventBus;
