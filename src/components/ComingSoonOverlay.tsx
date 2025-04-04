const ComingSoonOverlay: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div style={{ filter: 'blur(5px)', width: '100%', height: '100%' }}>
        {children}
      </div>
      {/* <div style={{ position: 'absolute', top: '40vh', left: '50%', transform: 'translateX(-50%)', color: '#000', fontSize: '24px', fontWeight: 'bold' }}> */}
        {/* Coming Soon */}
      {/* </div> */}
    </div>
  );

  export default ComingSoonOverlay;