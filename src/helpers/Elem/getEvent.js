import { assign, toStringTag } from '../../utils';
import { isDocument } from './is';

const EVENT_REGEX = /Event$/;

export function getEvent(event, bubbles, cancelable, realDetails, elem) {
  let finalEvent = event;

  if (!EVENT_REGEX.test(toStringTag(finalEvent))) {
    try {
      finalEvent = new Event(finalEvent, { bubbles, cancelable });
      assign(finalEvent, realDetails);
    } catch (err) {
      const document = isDocument(elem)
        ? elem
        : elem.ownerDocument;

      finalEvent = document.createEvent('Event');
      finalEvent.initEvent(event, bubbles, cancelable);

      assign(finalEvent, realDetails);
    }
  }

  return finalEvent;
}
