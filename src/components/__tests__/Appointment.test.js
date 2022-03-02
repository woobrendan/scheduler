import React from "react";

import { render /*, cleanup */ } from "@testing-library/react";

import Appointment from "components/Appointment/index"


// afterEach(cleanup);

describe("Appointment", () => {
  test("renders without crashing", () => {
    render(<Appointment />);
  });

});
