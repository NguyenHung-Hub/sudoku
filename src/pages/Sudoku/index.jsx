import React, { useEffect, useState } from "react";
import generateSudoku from "../../utils/sudoku";
import _ from "lodash";
import BroomIcon from "../../components/icons/broom";
import CrossIcon from "../../components/icons/cross";

import Timer from "../../components/timer";
import ReactConfetti from "react-confetti";
import { getWindowDimensions } from "../../utils/common";
import ModalWin from "../../components/modal/ModalWin";
import { formatTime } from "../../utils/time";
import ModalSelectLevel from "../../components/modal/ModalSelectLevel";
import RefreshIcon from "../../components/icons/refresh";

const SudokuPage = () => {
  const [sudoku, setSudoku] = useState({
    origin: [],
    data: [],
    solve: [],
    status: false,
    time: null,
  });
  const [isOpenNumber, setIsOpenNumber] = useState("");
  const [errors, setErrors] = useState([]);
  const [modalWin, setModalWin] = useState(false);
  const [modalSelectLevel, setModalSelectLevel] = useState(true);
  const [level, setLevel] = useState(10);
  const [seconds, setSeconds] = useState(0);
  const [isActiveTimer, setIsActiveTimer] = useState(false);
  const { width, height } = getWindowDimensions();

  useEffect(() => {
    if ([5, 20, 50].includes(level)) {
      start();
    }
  }, [level]);

  const start = () => {
    setIsActiveTimer(true);
    setModalSelectLevel(false);
    setModalWin(false);

    const { puzzle, solve } = generateSudoku(level);
    setSudoku({ origin: puzzle, data: puzzle, solve: solve() });
    // console.log("fu", puzzle);
    // console.log(solve());

    // const tempData = [
    //   [1, 6, 2, 5, 8, 3, 4, 7, 9],
    //   [3, 4, 5, 1, 7, 9, 2, 6, 8],
    //   [7, 8, 9, 2, 4, 6, 1, 3, 5],
    //   [2, 1, 3, 4, 5, 7, 8, 9, 6],
    //   [4, 5, 6, 3, 9, 8, 7, 1, 2],
    //   [8, 9, 7, 6, 1, 2, 3, 5, 4],
    //   [5, 2, 1, 7, 6, 4, 0, 8, 3],
    //   [6, 3, 8, 9, 2, 1, 5, 4, 7],
    //   [9, 7, 4, 8, 3, 5, 6, 2, 1],
    // ];
    // const tempSolve = [
    //   [1, 6, 2, 5, 8, 3, 4, 7, 9],
    //   [3, 4, 5, 1, 7, 9, 2, 6, 8],
    //   [7, 8, 9, 2, 4, 6, 1, 3, 5],
    //   [2, 1, 3, 4, 5, 7, 8, 9, 6],
    //   [4, 5, 6, 3, 9, 8, 7, 1, 2],
    //   [8, 9, 7, 6, 1, 2, 3, 5, 4],
    //   [5, 2, 1, 7, 6, 4, 9, 8, 3],
    //   [6, 3, 8, 9, 2, 1, 5, 4, 7],
    //   [9, 7, 4, 8, 3, 5, 6, 2, 1],
    // ];
    // setSudoku({ origin: tempData, data: tempData, solve: tempSolve });
  };

  const restart = () => {
    setLevel(null);
    setSeconds(0);
    setIsActiveTimer(false);
    setModalSelectLevel(true);
    setErrors([]);
  };

  const handleCell = (key, editable) => {
    if (editable) {
      setIsOpenNumber(key != isOpenNumber ? key : "");
    }
  };

  const handleUpdateCell = (iRow, iColumn, value) => {
    const newData = _.cloneDeep(sudoku.data);
    newData[iRow][iColumn] = value;
    setSudoku((prev) => ({ ...prev, data: newData }));
    const isValid = check(iRow, iColumn, newData, value);

    const key = `${iRow}${iColumn}`;
    if (!isValid) {
      setErrors((prev) => [...prev, key]);
    } else {
      const tempErrors = _.cloneDeep(errors);
      const filterErrors = tempErrors.filter((e) => e != key);
      setErrors(filterErrors);
    }

    const finished = _.flatMap(newData).every((i) => i != 0);
    // console.log(finished);
    if (finished) {
      const c = checkFinish(sudoku.solve, newData);
      if (c) {
        setIsActiveTimer(false);
        setSudoku((p) => ({ ...p, status: c }));
        setModalWin(true);
        setLevel(null);
      }
    }
  };

  const handleClearCell = (iRow, iColumn) => {
    const newData = _.cloneDeep(sudoku.data);
    newData[iRow][iColumn] = 0;
    setSudoku((prev) => ({ ...prev, data: newData }));
  };

  const getArea = (iRow, iColumn) => {
    if (iRow < 0 || iRow > 8 || iColumn < 0 || iColumn > 8) {
      throw new Error("Invalid row or column");
    }

    const rowGroup = Math.floor(iRow / 3);
    const colGroup = Math.floor(iColumn / 3);

    return rowGroup * 3 + colGroup + 1;
  };

  // 'area':[iRowStart,iRowEnd,iColumnStart, iColumnEnd]
  const areaMap = {
    1: [0, 2, 0, 2],
    2: [0, 2, 3, 5],
    3: [0, 2, 6, 8],
    4: [3, 5, 0, 2],
    5: [3, 5, 3, 5],
    6: [3, 5, 6, 8],
    7: [6, 8, 0, 2],
    8: [6, 8, 3, 5],
    9: [6, 8, 6, 8],
  };

  const getAreaData = (iRow, iColumn, data) => {
    const n = getArea(iRow, iColumn);
    const areaData = [];
    for (let i = areaMap[n][0]; i <= areaMap[n][1]; i++) {
      for (let j = areaMap[n][2]; j <= areaMap[n][3]; j++) {
        areaData.push(data[i][j]);
      }
    }
    return areaData;
  };

  const check = (iRow, iColumn, data, value) => {
    //check row
    const countRow = _.countBy(data[iRow]);
    if (countRow[value] > 1) {
      return false;
    }

    //check column
    const columnData = data.reduce((prev, row) => [...prev, row[iColumn]], []);
    const countColumn = _.countBy(columnData);
    if (countColumn[value] > 1) {
      return false;
    }
    //check area
    const countArea = _.countBy(getAreaData(iRow, iColumn, data));
    if (countArea[value] > 1) {
      return false;
    }

    return true;
  };

  const checkErrors = (data) => {
    const e = _.cloneDeep(errors).filter((err) => {
      const iRow = Number(err[0]);
      const iColumn = Number(err[1]);
      const value = data[iRow][iColumn];
      const isValid = check(iRow, iColumn, data, value);
      return !isValid;
    });
    setErrors(e);
  };

  const checkFinish = (originData, data) => {
    const flat = _.flatMap(originData).some((i) => i == 0);
    // console.log("flat", flat, originData);
    // console.log(_.flatMap(originData));
    if (flat) {
      return false;
    }

    for (let i = 0; i < originData.length; i++) {
      const row = originData[i];
      for (let j = 0; j < row.length; j++) {
        if (row[j] != data[i][j]) {
          return false;
        }
      }
    }
    return true;
  };

  useEffect(() => {
    checkErrors(sudoku.data);
  }, [sudoku.data]);

  return (
    <div className="flex h-screen w-full flex-col items-center bg-[#332F35]">
      {sudoku.status && (
        <ReactConfetti width={width - 10} height={height - 10} />
      )}

      <div className="mt-8 w-[450px]">
        <div className="flex items-center justify-between">
          <div onClick={restart} className="hover:cursor-pointer">
            <RefreshIcon color="#B8B5B9" />
          </div>
          <Timer
            isActive={isActiveTimer}
            seconds={seconds}
            setSeconds={setSeconds}
          />
        </div>
        <div className="custom-border grid grid-cols-9 grid-rows-9 border-l border-t border-l-gray-600 border-t-gray-600 bg-slate-300">
          {sudoku.data?.map((row, iRow) => {
            return row.map((number, iColumn) => {
              const key = `${iRow}${iColumn}`;
              const editable = sudoku.origin[iRow][iColumn] == 0;
              return (
                <div
                  onClick={() => handleCell(key, editable)}
                  className={`${editable ? "hover:cursor-pointer" : "bg-slate-400 "} ${isOpenNumber == key ? "bg-[#cbcaa4]" : ""} ${iRow == 2 || iRow == 5 ? "border-b-2 border-b-gray-800" : "border-b border-b-gray-500"} ${iColumn == 2 || iColumn == 5 ? "border-r-2 border-r-gray-800" : "border-r border-r-gray-500"} relative flex aspect-square items-center justify-center  text-2xl`}
                  key={key}
                >
                  <p
                    className={`relative select-none ${errors.includes(key) ? "text-red-500" : "text-gray-700"}`}
                  >
                    {number == 0 ? "" : number}
                  </p>
                  {isOpenNumber == key && editable && (
                    <div className="absolute left-full top-0 z-40  ml-1 bg-[#45444F] p-1">
                      <div className="grid w-[150px] grid-cols-3 grid-rows-4 ">
                        {Array.from({ length: 9 }, (_, i) => i + 1).map(
                          (n, i3) => (
                            <div
                              key={i3}
                              onClick={() => handleUpdateCell(iRow, iColumn, n)}
                              className="flex aspect-square items-center justify-center hover:cursor-pointer hover:bg-[#B8B5B9]"
                            >
                              <p className="select-none text-gray-200">{n}</p>
                            </div>
                          ),
                        )}
                        <div className="col-span-3 flex items-center justify-between">
                          <div
                            onClick={() => handleClearCell(iRow, iColumn)}
                            className="flex h-full flex-1 items-center justify-center hover:bg-[#B8B5B9]"
                          >
                            <BroomIcon color="white" />
                          </div>
                          <div
                            onClick={() => setIsOpenNumber(false)}
                            className="flex h-full flex-1 items-center justify-center hover:bg-[#B8B5B9]"
                          >
                            <CrossIcon color="white" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            });
          })}
        </div>
      </div>
      <ModalWin isOpen={modalWin}>
        <div className="flex flex-col items-center justify-center py-4">
          <p className="text-8xl font-bold text-red-400">You win</p>
          <p className="mt-4 text-4xl font-bold text-slate-700">
            {formatTime(seconds)}
          </p>
          <div
            onClick={restart}
            className="mt-4 w-2/3 rounded-lg bg-[#B2B47E] px-8 py-4 text-center text-2xl font-bold uppercase tracking-wide text-[#FFFCF9] hover:cursor-pointer"
          >
            New Game
          </div>
        </div>
      </ModalWin>
      <ModalSelectLevel isOpen={modalSelectLevel} setLevel={setLevel} />
    </div>
  );
};

export default SudokuPage;
