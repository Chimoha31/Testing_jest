import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { validateEmail } from "../Login";

// *test()やrender()やscreenはtesting-library/reactのライブラリで、
// *findAllByRole()はjestのライブラリ

// describe()⇨describe()内の第一引数に何を今からtestするか記載。
describe("Test Login Component", () => {
  // 例①：buttonが1つあるかどうかのテスト！
  test("render form with 1 button", async () => {
    // render()内にどのcomponentか記載
    render(<Login />);
    const buttonList = await screen.findAllByRole("button");
    console.log(buttonList);
    // tohaveLength()⇨何個あるか数える関数
    expect(buttonList).toHaveLength(1);
  });
  // 例②：emailが正常でない、間違った値を入力されたらそれは間違ったアドレスですというテストに合格
  test("Should be failed on email validation!", () => {
    const testEmail = "chiho.com";
    expect(validateEmail(testEmail)).not.toBe(true);
  });
  // 例③：emailが正常な値を入力されたらそれは正常なアドレスですというテストに合格
  test("Should be succeeded on email validation!", () => {
    const testEmail = "chiho@gmail.com";
    expect(validateEmail(testEmail)).toBe(true);
  });
  // 例④：passwordのtypeがtype="password"になっているかのテスト
  test("Password in input should have type password", () => {
    render(<Login />);
    const password = screen.getByPlaceholderText("パスワード入力");
    expect(password).toHaveAttribute("type", "password");
  });
  test("Should be able to submit the form", () => {
    // 例⑤：emailとpasswordを入力して、きちんと送信(submit)できるかのテスト
    render(<Login />);
    const submitButton = screen.getByTestId("submit");
    const email = screen.getByPlaceholderText("メールアドレス入力");
    const password = screen.getByPlaceholderText("パスワード入力");

    userEvent.type(email, "chiho@gmail.com");
    userEvent.type(password, "abcdef");

    userEvent.click(submitButton);

    const userInfo = screen.getByText("chiho@gmail.com");
    expect(userInfo).toBeInTheDocument();
  })
});
