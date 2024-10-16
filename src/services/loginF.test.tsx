import { renderHook , act } from "@testing-library/react";
import { AuthProvider , useAuth } from './loginF';

describe('Auth Context', () => {
  it('should log in with valid credentials', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login('test@example.com', '123456');
      expect(success).toBe(true);
    });

    expect(result.current.user).toEqual({ name: 'Renan', email: 'test@example.com' });
  });

  it('should not log in with invalid password', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login('test@example.com', 'wrongpassword');
      expect(success).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it('should log out the user', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthProvider>{children}</AuthProvider>
    );
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('test@example.com', '123456');
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });
});
