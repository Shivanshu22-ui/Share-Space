import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Link } from "react-router-dom";

export default function FolderBreadCrums({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];
  return (
    <Breadcrumb
      className="flex-grow-1"
      listProps={{ className: "bg-white px-0 m-0" }}
    >
      {currentFolder && (
        <>
          {path.map((pt, index) => (
            <Breadcrumb.Item
              className="text-truncate d-inline-block"
              style={{ maxWidth: "200px" }}
              key={pt.id}
              linkAs={Link}
              linkProps={{
                to: {
                  pathname: pt.id ? `/folder/${pt.id}` : "/",
                  state: pt.id?pt.id:1,
                },
              }}
            >
              {pt.name}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item
            className="text-truncate d-inline-block"
            style={{ maxWidth: "200px" }}
            active
          >
            {currentFolder.name}
          </Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
}
