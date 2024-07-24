export function Loading({loadingText}: { loadingText?: string }) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-sky-50">
      <div className="p-4 rounded-xl bg-sky-100 text-center">
        <div className="text-xl">加载中...</div>
        {loadingText && <div>{loadingText}</div>}
      </div>
    </main>
  )
}
