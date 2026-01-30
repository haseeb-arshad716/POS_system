import React from 'react';

const Header = ({ currentUser, onLogout }) => {
    return (
        <header style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 25px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)',

        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                
                <h1 style={{
                    fontSize: '25px',
                    fontWeight: '600',
                    color: '#1e293b',
                    fontFamily: "'Inter', sans-serif",
                    margin: 0,
                    letterSpacing: '-0.5px'
                }}>
                    Nexus  <span style={{ color: '#3b82f6' }}>Retail</span>
                </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: '#f8fafc',
                    padding: '5px 12px',
                    borderRadius: '10px',
                    border: '1px solid #f1f5f9'
                }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: '#334155' }}>
                            {currentUser?.name?.toUpperCase() || "GUEST"}
                        </div>
                    </div>
                    <div style={{
                        width: '32px',
                        height: '32px',
                        backgroundColor: '#e2e8f0',
                        color: '#475569',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        border: '2px solid #fff'
                    }}>
                        {currentUser?.name?.charAt(0).toUpperCase() || "G"}
                    </div>
                </div>



                <button
                    onClick={onLogout}
                    title="Logout"
                    style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#fee2e2';
                        e.currentTarget.style.color = '#ef4444';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#94a3b8';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;