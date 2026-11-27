
    (function () {
      const goToStart = () => {
        // Usamos location.replace para evitar manter esta página no histórico
        location.replace('artes.html');
      };

      const goToIndex = () => {
        location.replace('../../Pasta-html/index.html');
      };

      document.getElementById('recomecar').addEventListener('click', goToStart);
      document.getElementById('voltar').addEventListener('click', goToIndex);

      // Permitir ativação via tecla Enter/Space quando o botão estiver em foco

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
  