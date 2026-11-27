
    (function () {
      const goToStart = () => {
    
        location.replace('matematica.html');
      };

      const goToIndex = () => {
        location.replace('../../Pasta-html/index.html');
      };

      document.getElementById('recomecar').addEventListener('click', goToStart);
      document.getElementById('voltar').addEventListener('click', goToIndex);

  
      ['recomecar', 'voltar'].forEach((id) => {
        const el = document.getElementById(id);
        el.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            el.click();
          }
        });
      });
    })();
  