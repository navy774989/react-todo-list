import { renderHook, act } from "@testing-library/react-hooks";
import { useModal } from "./useModal";

test("isOpen should follow default value", () => {
  const { result: testcase1 } = renderHook(() =>
    useModal({
      isOpen: true,
    })
  );
  const { result: testcase2 } = renderHook(() =>
    useModal({
      isOpen: false,
    })
  );

  expect(testcase1.current.isOpen).toBe(true);
  expect(testcase2.current.isOpen).toBe(false);
});

test("isOpen should be true", () => {
  const { result } = renderHook(() => useModal());

  act(() => {
    result.current.onOpen();
  });
  expect(result.current.isOpen).toBe(true);
});

test("isOpen should be false", () => {
  const { result } = renderHook(() => useModal({ isOpen: true }));
  act(() => {
    result.current.onClose();
  });
  expect(result.current.isOpen).toBe(false);
});
