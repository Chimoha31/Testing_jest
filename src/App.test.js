import { render, screen } from '@testing-library/react';
import App from './App';

// 第一引数⇨今からテストする内容を記述する(Testの題名、名前みたいなもん)。
test('renders learn react link', () => {
  // <App />をテストしていこう！という意。
  render(<App />);
  // "(/react/)の”/”は、大文字でも小文字でもどちらでもいいという意。"
  const linkElement = screen.getByText(/react/i);
  // Textのleran reactがtobeinthedocument=(documentの中に存在しているか)書かれているかを検査
  expect(linkElement).toBeInTheDocument();
});

// 上記が揃ったらnpm testでterminalで確認。
