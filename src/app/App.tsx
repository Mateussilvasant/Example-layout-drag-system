import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LayoutManager } from '../pages/layout-manager';
import { MainApp } from './styles';

function App() {
  return (
    <MainApp>
      <DndProvider backend={HTML5Backend}>
        <nav>
          <p>Layout drag system</p>
        </nav>
        <main>
          <aside>
          </aside>
          <div className="main-content">
            <LayoutManager />
          </div>
        </main>
      </DndProvider>
    </MainApp>
  );
}

export default App;
