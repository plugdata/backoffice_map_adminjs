/**
 * Authentication Handler
 */

class AuthManager {
    constructor() {
        this.storageKey = 'adminUser';
        this.tokenKey = 'adminToken';
    }

    // Check if user is authenticated
    isAuthenticated() {
        // สำหรับ AdminJS ที่ใช้ session-based ไม่จำเป็นต้องมี token เสมอไป
        // แค่มีข้อมูลผู้ใช้ใน storage ก็ถือว่าผ่านในขั้นต้น (แล้วค่อยไปเช็ค 401 ที่ API อึกที)
        return !!this.getUser();
    }

    // Get current user
    getUser() {
        const user = localStorage.getItem(this.storageKey) || sessionStorage.getItem(this.storageKey);
        return user ? JSON.parse(user) : null;
    }

    // Get auth token
    getToken() {
        return localStorage.getItem(this.tokenKey) || sessionStorage.getItem(this.tokenKey);
    }

    // Save auth data
    saveAuth(user, token, remember = false) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(this.storageKey, JSON.stringify(user));
        // ถ้าไม่มี token ให้เซ็ตเป็น 'SESSION_BASED' เพื่อให้ getToken() ไม่ว่าง
        storage.setItem(this.tokenKey, token || 'SESSION_BASED');
    }

    // Clear auth data
    clearAuth() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.tokenKey);
        sessionStorage.removeItem(this.storageKey);
        sessionStorage.removeItem(this.tokenKey);
    }

    // Login
    /*     async login(username, password, remember = false) {
            try {
                // Try AdminJS session-based login first
                const response = await fetch('/admin/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: username, password }),
                    credentials: 'include'
                });
    
                if (response.ok) {
                    const data = await response.json();
                    const user = data.user || { username, role: 'admin' };
                    this.saveAuth(user, data.token, remember);
                    return { success: true, user };
                }
    
                // Fallback: check if already logged in via session
                const checkResponse = await fetch('/admin/api/session', {
                    credentials: 'include'
                });
    
                if (checkResponse.ok) {
                    const sessionData = await checkResponse.json();
                    if (sessionData.user) {
                        this.saveAuth(sessionData.user, null, remember);
                        return { success: true, user: sessionData.user };
                    }
                }
    
                return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
            } catch (error) {
                console.error('Login error:', error);
                return { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
            }
        } */
    // Login
    async login(username, password, remember = false) {
        try {
            // ==============================
            // REAL LOGIN (AdminJS API)
            // ==============================
            const response = await fetch('/admin/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: username, password }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user || { username, role: 'admin' };
                this.saveAuth(user, data.token, remember);
                return { success: true, user };
            }

            // ==============================
            // FALLBACK: SESSION CHECK
            // ==============================
            const checkResponse = await fetch('/admin/api/session', {
                credentials: 'include'
            });

            if (checkResponse.ok) {
                const sessionData = await checkResponse.json();
                if (sessionData.user) {
                    this.saveAuth(sessionData.user, null, remember);
                    return { success: true, user: sessionData.user };
                }
            }

            return { success: false, error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' };
        }
    }
    // Logout
    async logout() {
        try {
            await fetch('/admin/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
        } catch (e) {
            // Ignore errors
        }
        this.clearAuth();
        window.location.href = '/admin/login';
    }

    // Require auth (redirect if not authenticated)
    requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = '/admin/login';
            return false;
        }
        return true;
    }

    // Check role
    hasRole(role) {
        const user = this.getUser();
        if (!user) return false;
        if (Array.isArray(role)) {
            return role.includes(user.role);
        }
        return user.role === role;
    }

    // Update user display in header
    updateUserDisplay() {
        const user = this.getUser();
        const userNameEl = document.getElementById('userName');
        const userRoleEl = document.getElementById('userRole');

        if (userNameEl && user) {
            userNameEl.textContent = user.fullName || user.username || 'ผู้ใช้';
        }
        if (userRoleEl && user) {
            userRoleEl.textContent = this.getRoleLabel(user.role);
        }
    }

    // Get Thai role label
    getRoleLabel(role) {
        const labels = {
            'admin': 'ผู้ดูแลระบบ',
            'user': 'ผู้ใช้งาน',
            'viewer': 'ผู้ชม'
        };
        return labels[role] || role;
    }
}

// Create singleton instance
const authManager = new AuthManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, authManager };
}
