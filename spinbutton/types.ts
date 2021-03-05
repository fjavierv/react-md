import { HTMLAttributes, Ref, RefCallback } from "react";

/**
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export type SpinValueNextResult<D = Record<string, unknown>> = {
  /**
   * The next value string to use for the `SpinButton`.
   */
  value: string;

  /**
   * Boolean if the type behavior has been completed since the current key is
   * greater than a key allowed for the current digit.
   */
  completed?: boolean;
} & D;

/**
 * This function is used to help "autocomplete" the spinbutton value.
 *
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @param keys - The current keys that have been entered into the `SpinButton`
 * @param value - The current stringified value of the `SpinButton`
 * @remarks \@since 2.7.0
 */
export type GetSpinValueNextResult<D = Record<string, unknown>> = (
  keys: readonly number[],
  value: string
) => SpinValueNextResult<D>;

/**
 * This function is called whenever the `onSuggest` function returns
 * `completed: true`.
 *
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export type SpinValueCompletedCallback<
  E extends HTMLElement,
  D = Record<string, unknown>
> = (result: SpinValueNextResult<D> & { target: E }) => void;

/**
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @remarks \@since 2.7.0
 */
export type SpinButtonValueHandlers<E extends HTMLElement> = Pick<
  HTMLAttributes<E>,
  "onFocus" | "onChange" | "onKeyDown"
>;

/**
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export interface BaseSpinButtonOptions<
  E extends HTMLElement,
  D = Record<string, unknown>
> extends SpinButtonValueHandlers<E> {
  /**
   * The min value allowed.
   */
  min: number;

  /**
   * The max value allowed.
   */
  max: number;

  /**
   * Boolean if the value can loop from `min -> max` and `max -> min`.
   *
   * @defaultValue `true`
   */
  loopable?: boolean;

  /**
   * This function provides the "autocompletion"/"value fixes" to the
   * `SpinButton`.
   */
  onSuggest: GetSpinValueNextResult<D>;

  /**
   * This function is called whenever the {@link onSuggest} function returns
   * `completed: true`. This is normally where you'd want to set the current
   * value of the `SpinButton` in state and/or advance focus to the next element
   * if rendered within a group.
   */
  onCompleted?: SpinValueCompletedCallback<E, D>;
}

/**
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @remarks \@since 2.7.0
 */
export type ProvidedSpinButtonProps<E extends HTMLElement> = Required<
  SpinButtonValueHandlers<E>
>;

/**
 * These are the props that are provided when the `isInput` option is enabled so
 * that the value can work for `TextField`/`<input type="text" />` elements.
 *
 * @remarks \@since 2.7.0
 */
export interface ProvidedEditableSpinButtonProps
  extends ProvidedSpinButtonProps<HTMLInputElement> {
  /** {@inheritDoc EditableSpinButtonOptions#ref} */
  ref: RefCallback<HTMLInputElement>;
  /** {@inheritDoc EditableSpinButtonOptions#required} */
  required: boolean;
  /** {@inheritDoc EditableSpinButtonOptions#defaultValue} */
  defaultValue: string;
}

/**
 * This is mostly an internal type since either the
 * {@link ProvidedSpinButtonProps} or {@link ProvidedEditableSpinButtonProps}
 * can really be returned from the `useSpinValue` hook. This type is just to
 * help with the function type overrides.
 *
 * @remarks \@since 2.7.0
 * @internal
 */
export interface ProvidedUseSpinButtonProps<E extends HTMLElement>
  extends ProvidedSpinButtonProps<E> {
  /** {@inheritDoc EditableSpinButtonOptions#ref} */
  ref?: RefCallback<E>;
  /** {@inheritDoc EditableSpinButtonOptions#required} */
  required?: boolean;
  /** {@inheritDoc EditableSpinButtonOptions#defaultValue} */
  defaultValue?: string;
}

/**
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export interface EditableSpinButtonOptions<D = Record<string, unknown>>
  extends BaseSpinButtonOptions<HTMLInputElement, D> {
  /**
   * An optional ref to merge with the returned `ref` if you need access to the
   * `HTMLInputElement` for some custom `onCompleted` logic.
   */
  ref?: Ref<HTMLInputElement>;

  /**
   * Settings this to `true` makes the `useSpinValue` only work on `<input>`
   * elements since it will ensure that the text is selected each time a new
   * digit is added using `setSelectionRange`.
   */
  isInput: true;

  /**
   * Boolean if the value should be required. This will make sure that a
   * containing form cannot be submitted if the `value` is not set.
   *
   * @see {@link emptyMessage}
   */
  required?: boolean;

  /**
   * The optional placeholder text to display if there is no value.
   *
   * @defaultValue `"-".repeat(max.toString().length)`
   */
  placeholder?: string;

  /**
   * This is used to ensure that a form can't be submitted without filling out
   * an editable `SpinButton`'s value by using the validity API to flag this
   * input as invalid and display this message. This is really just useful when
   * rendered in a `role="group"` where multiple `SpinButton`s are used to
   * create a full value.
   *
   * Set this value to the empty string to allow an empty value to be submitted.
   *
   * @defaultValue `"Please fill out this field."`
   */
  emptyMessage?: string;
}

/**
 * @typeParam E - The `HTMLElement` that is being rendered as a
 * `role="spinbutton"`.
 * @typeParam D - This is any additional data that should be returned with the
 * result of the {@link GetSpinValueNextResult} function.
 * @remarks \@since 2.7.0
 */
export type SpinButtonOptions<
  E extends HTMLElement,
  D = Record<string, unknown>
> = BaseSpinButtonOptions<E, D> & {
  ref?: Ref<E>;
  isInput?: boolean;
  required?: boolean;
  placeholder?: string;
  emptyMessage?: string;
};
