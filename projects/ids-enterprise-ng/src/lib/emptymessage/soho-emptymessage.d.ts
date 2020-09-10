/**
 * Soho Empty Message Control.
 *
 * This file contains the Typescript mappings for the public
 * interface of the Soho jQuery empty message control.
 *
 * Only the public interface consumable by the Angular
 * Soho Component is included in this file.
 *
 * The corresponding Soho control can be found in emptymessage.js.
 */

/**
 * Soho Empty Message configuration options
 *
 * See the jQuery control for the defaults.
 */
interface SohoEmptyMessageOptions {
  /**
   * Title text.
   */
  title?: string;

  /**
   * Informational text.
   */
  info?: string;

  /**
   * Icon, to display (see svg-empty) - must be the full icon name.
   */
  icon?: string;

  /**
   * The container height. If set to 'small' will show only title and all other elements will not be rendered (icon, button, info)
   */
  height?: string;

  /**
   * Button options - note this cannot be a Soho Angular Component.
   */
  button?: SohoEmptyMessageButtonOptions;

  /**
   * slate or azure for now until personalization works
   */
  color?: EmptyMessageColor;
}

/**
 * valid colors for the empty message color.
 */
type EmptyMessageColor = 'slate' | 'azure' | 'amber' | 'amethyst' | 'emerald' | 'ruby' | 'graphite' | 'turquoise';

/**
 * Button definition.
 */
interface SohoEmptyMessageButtonOptions {
  /**
   * Button text.
   */
  text: string;

  /**
   * Class of button.
   */
  cssClass?: string;

  /**
   * Element button for id.
   */
  id?: string;

  /**
   * Click function
   */
  click?: Function;

  /**
   * Set the button to primary (azure)
   */
  isPrimary?: boolean;
}

/**
 * This interface represents the Api exposed by the
 * soho control.
 *
 * Only public members are exposed on this interface.
 */
interface SohoEmptyMessageStatic {

  /** Element. */
  element: JQuery;

  /** Control options. */
  settings: SohoEmptyMessageOptions;

  /**
   * Causes the empty  message to be rebuilt when input changes.
   */
  updated(): void;

  /**
   * Releases all resources managed by the empty message.
   */
  destroy(): void;
}

/**
 * Integration with jQuery
 */
interface JQuery<TElement = HTMLElement> extends Iterable<TElement> {
  emptymessage(options: SohoEmptyMessageOptions): JQuery;
}

interface JQueryStatic {
  emptymessage: SohoEmptyMessageStatic;
}
