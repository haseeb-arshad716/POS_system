import React from 'react';

const StatCard = ({ label, value, icon, color, bgColor }) => {
    return (
        <div style={{
            flex: '1',
            maxWidth: '240px',
            height:'150px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            transition: 'transform 0.2s ease'
        }} className='stat-card' >
           
            <div style={{
                backgroundColor: bgColor, 
                color: color,          
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom:'25px'
            }}>
                {icon}
            </div>

            <div>
                <p style={{ 
                    marginBottom: '20px', 
                    color: '#64748b', 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    textTransform: 'uppercase' 
                }}>
                    {label}
                </p>
                <h3 style={{ 
                    margin: 0, 
                    fontSize: '24px', 
                    fontWeight: '800', 
                    color: '#1e293b' 
                }}>
                    {value}
                </h3>
            </div>
        </div>
    );
};

export default StatCard;