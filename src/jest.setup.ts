import "@testing-library/jest-dom";

// Мок react-redux
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Мок react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));

jest.mock("react-quill-new", () => {
  const ReactQuill = jest.fn();
  return { __esModule: true, default: ReactQuill };
});
