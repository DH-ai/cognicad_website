"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { deleteBlogPost } from "@/app/admin/blog/actions";

function DeleteSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary [--btn-primary-bg:var(--danger)] [--btn-primary-bg-hover:var(--danger)] [--btn-primary-fg:var(--white)]"
    >
      {pending ? "Deleting…" : "Delete forever"}
    </button>
  );
}

export function DeleteBlogPost({ id, title }: { id: string; title: string }) {
  const [confirming, setConfirming] = useState(false);

  return (
    <section className="panel mt-8 border-danger/40 p-6 md:p-8">
      <p className="type-tech mb-3 text-danger">Danger zone</p>
      <h2 className="type-small mb-3 text-fg">Permanently delete this post</h2>
      <p className="type-body max-w-2xl text-muted">
        This removes the post and its unused uploaded images. This action cannot be undone.
      </p>

      {!confirming ? (
        <button
          type="button"
          className="btn btn-secondary mt-6"
          onClick={() => setConfirming(true)}
        >
          Delete permanently
        </button>
      ) : (
        <div className="mt-6 border border-danger/40 bg-canvas p-5" role="alert">
          <p className="font-[550] text-fg">Delete “{title}” forever?</p>
          <p className="mt-2 text-sm text-muted">There is no recovery after you confirm.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <form action={deleteBlogPost}>
              <input type="hidden" name="id" value={id} />
              <DeleteSubmitButton />
            </form>
            <button type="button" className="btn btn-secondary" onClick={() => setConfirming(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
